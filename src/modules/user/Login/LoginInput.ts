import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  // @isEmailAlreadyExist({
  //   message: "Email $value already exists. Choose another email.",
  // })
  email: string;

  @Field()
  password: string;
}
