import { Field, InputType } from "type-graphql";

@InputType()
export class JWTInput {
  @Field()
  token: string;
}
