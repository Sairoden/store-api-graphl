const typeDefs = `#graphql
  type Query {
    products(data: ProductInput, options: OptionInput): [Product!]
  }

  type Mutation {
    createProduct(data: ProductInput): Product
  }

  type Product {
  name: String!,
  price: Float!,
  featured: Boolean,
  rating: Float,
  createdAt: String,
  company: String
  }

  input ProductInput {
    name: String, 
    price: Float,
    featured: Boolean,
    rating: Float,
    createdAt: String,
    company: String
  }

  input OptionInput {
    sort: String,
    page: Int,
    limit: Int,
    numericFilters: String
  }
`;

module.exports = typeDefs;
