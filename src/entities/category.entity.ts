import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItemEntity } from './menu-item.entity';
import { MenuEntity } from './menu.entity';

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

  @ManyToOne(() => MenuEntity, (menu) => menu.categories)
  @Field(() => MenuEntity)
  menu: MenuEntity;
}
