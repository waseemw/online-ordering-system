import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { MenuItemEntity } from './menu-item.entity';
import { ModificationItemEntity } from './modification-item.entity';
import { CartEntity } from './cart.entity';

@ObjectType()
@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(() => MenuItemEntity)
  @Field(() => MenuItemEntity)
  menuItem: MenuItemEntity;

  @ManyToOne(() => MenuItemEntity)
  @Field(() => MenuItemEntity)
  modificationItems: ModificationItemEntity[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  freeFormText?: string;

  @Field(() => CartEntity)
  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  cart: CartEntity;
}
