import jwt from "jsonwebtoken";

export const generarJWT = (id: number, name: string): Promise<any> => {
  const payload = { id, name };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SEED!,
      {
        expiresIn: "24h",
      },
      (err: any, token: string | undefined) => {
        if (err) {
          console.log("error generando token");
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
