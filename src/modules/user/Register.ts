import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { generarJWT } from "./JWT/create";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, password, firstName, lastName }: RegisterInput
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    const token = await generarJWT(user.id, user.email);
    return {
      ...user,
      token,
    };
  }
}
