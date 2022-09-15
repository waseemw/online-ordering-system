import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from './category.entity';

@ObjectType()
@Entity()
export class MenuEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => CategoryEntity, (category) => category.menu)
  @Field(() => [CategoryEntity])
  categories: CategoryEntity[];
}
