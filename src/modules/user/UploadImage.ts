import { Resolver, Mutation, Arg, Field, ObjectType } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@ObjectType()
class uploadResponse {
  @Field()
  uploaded: boolean;

  @Field()
  image: string;
}

@Resolver()
export class UploadImageResolver {
  @Mutation(() => uploadResponse)
  async uploadImage(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<uploadResponse> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(__dirname + `/../../../public/images/${filename}`)
        )
        .on("finish", () =>
          resolve({ uploaded: true, image: `/images/${filename}` })
        )
        .on("error", () => reject({ uploaded: false }))
    );
  }
}
