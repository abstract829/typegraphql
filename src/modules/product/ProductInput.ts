import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  body: string;

  @Field()
  price: number;

  @Field()
  category: number;

  @Field()
  stock: number;

  @Field()
  image: string;
}
