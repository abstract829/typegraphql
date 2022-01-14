import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { JWTInput } from "./JWTInput";
import jwt from "jsonwebtoken";
import { User } from "../../../entity/User";
import { generarJWT } from "./create";
// import { generarJWT } from './create';

@Resolver()
export class JWTValidate {
  @Query(() => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async validateJWT(@Arg("data") { token }: JWTInput): Promise<any> {
    const decoded: any = jwt.verify(token, process.env.JWT_SEED!);
    const user = await User.findOne(decoded.id);
    const newToken = await generarJWT(user.id, user.email);

    return {
      ...user,
      token: newToken,
    };
  }
}
