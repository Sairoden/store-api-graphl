const Product = require("./productModel");

const products = async (parent, args, ctx, info) => {
  try {
    const queryObject = args.data || {};
    const sort = args.options?.sort || "";
    const page = args.options?.page || 1;
    const limit = args.options?.limit || 10;
    const skip = (page - 1) * limit;

    if (queryObject.name) {
      queryObject.name = { $regex: queryObject.name, $options: "i" };
    }

    if (args.options.numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };

      const regEx = /\b(<|>|>=|=|<|<=)\b/g;

      let filters = args.options.numericFilters.replace(
        regEx,
        match => `-${operatorMap[match]}-`
      );

      const options = ["price", "rating"];

      filters = filters.split(",").forEach(item => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: value };
        }
      });
    }
    console.log(queryObject);

    let products = Product.find(queryObject);
    if (!products) throw new Error("No products available");

    products.sort(sort).skip(skip).limit(limit);

    return await products;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createProduct = async (parent, args, ctx, info) => {
  try {
    const newProduct = await Product.create(args.data);

    if (!newProduct) throw new Error("Can't make new product");

    return newProduct;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { products, createProduct };

// 17 ka na
