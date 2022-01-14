import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Product } from "../../entity/Product";
import { ProductInput } from "./ProductInput";
import { Category } from "../../entity/Category";

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    const products = await Product.find();
    return products;
  }

  @FieldResolver(() => String)
  async categoryName(@Root() parent: Product): Promise<any> {
    const findCategory = await Category.findOne(parent.category);
    return findCategory!.name;
  }
  @Mutation(() => Product)
  async addProduct(
    @Arg("data") { title, body, price, category, stock, image }: ProductInput
  ): Promise<any> {
    const product = await Product.create({
      title,
      body,
      price,
      category,
      stock,
      image,
    }).save();
    return product;
  }
}
