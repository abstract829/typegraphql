import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "./Login/LoginInput";
import { generarJWT } from "./JWT/create";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("data") { email, password }: LoginInput): Promise<any> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return null;

    const token = await generarJWT(user.id, user.email);
    return {
      ...user,
      token,
    };
  }
}
