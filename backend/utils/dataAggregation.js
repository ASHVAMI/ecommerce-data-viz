const Order = require('../models/order');
const Customer = require('../models/customer');

exports.getTotalSalesOverTime = async (interval) => {
  const groupBy = {
    daily: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
    monthly: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
    quarterly: {
      $concat: [
        { $substr: [{ $year: '$created_at' }, 0, 4] },
        '-Q',
        { $ceil: { $divide: [{ $month: '$created_at' }, 3] } },
      ],
    },
    yearly: { $dateToString: { format: '%Y', date: '$created_at' } },
  };

  return await Order.aggregate([
    {
      $group: {
        _id: groupBy[interval],
        totalSales: { $sum: '$total_price_set' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

exports.getSalesGrowthRateOverTime = async (interval) => {
  const salesData = await this.getTotalSalesOverTime(interval);

  const growthRateData = salesData.map((item, index, array) => {
    if (index === 0) return { _id: item._id, growthRate: 0 };

    const growthRate =
      ((item.totalSales - array[index - 1].totalSales) /
        array[index - 1].totalSales) *
      100;
    return { _id: item._id, growthRate: growthRate.toFixed(2) };
  });

  return growthRateData;
};

exports.getNewCustomersOverTime = async (interval) => {
  const groupBy = {
    daily: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
    monthly: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
    quarterly: {
      $concat: [
        { $substr: [{ $year: '$created_at' }, 0, 4] },
        '-Q',
        { $ceil: { $divide: [{ $month: '$created_at' }, 3] } },
      ],
    },
    yearly: { $dateToString: { format: '%Y', date: '$created_at' } },
  };

  return await Customer.aggregate([
    {
      $group: {
        _id: groupBy[interval],
        newCustomers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};


exports.getRepeatCustomersOverTime = async (interval) => {
  const groupBy = {
    daily: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
    monthly: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
    quarterly: {
      $concat: [
        { $substr: [{ $year: '$created_at' }, 0, 4] },
        '-Q',
        { $ceil: { $divide: [{ $month: '$created_at' }, 3] } },
      ],
    },
    yearly: { $dateToString: { format: '%Y', date: '$created_at' } },
  };

  return await Order.aggregate([
    {
      $group: {
        _id: '$customer_id',
        orders: { $sum: 1 },
      },
    },
    {
      $match: {
        orders: { $gt: 1 },
      },
    },
    {
      $group: {
        _id: groupBy[interval],
        repeatCustomers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};


exports.getGeographicalDistribution = async () => {
  return await Customer.aggregate([
    {
      $group: {
        _id: '$default_address.city',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};


exports.getCustomerLifetimeValueByCohorts = async () => {
  const cohorts = await Customer.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
        customerIds: { $push: '$_id' },
      },
    },
  ]);

  const cohortData = await Promise.all(
    cohorts.map(async (cohort) => {
      const orders = await Order.aggregate([
        {
          $match: {
            customer_id: { $in: cohort.customerIds },
          },
        },
        {
          $group: {
            _id: null,
            totalValue: { $sum: '$total_price_set' },
          },
        },
      ]);

      return {
        cohort: cohort._id,
        totalValue: orders[0] ? orders[0].totalValue : 0,
      };
    })
  );

  return cohortData.sort((a, b) => (a.cohort > b.cohort ? 1 : -1));
};
