import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  category: number;

  @Field()
  categoryName: string;

  @Field()
  @Column()
  stock: number;

  @Field()
  @Column({ nullable: true })
  image: string;
}
