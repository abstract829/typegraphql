import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CategoryInput } from "./CategoryInput";
import { Category } from "../../../entity/Category";
@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategorys() {
    const categorys = await Category.find();
    return categorys;
  }

  @Mutation(() => Category)
  async addCategory(@Arg("data") { name }: CategoryInput): Promise<any> {
    const category = await Category.create({ name }).save();
    return category;
  }
}
