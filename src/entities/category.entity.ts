import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuItemEntity } from './menu-item.entity';

@ObjectType()
@Entity()
export class CategoryEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [MenuItemEntity])
  @OneToMany(() => MenuItemEntity, (menuItem) => menuItem.category)
  menuItems: MenuItemEntity[];
}
