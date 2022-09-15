import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { MenuEntity } from './menu.entity';
import { CartItemEntity } from './cart-item.entity';

@Entity()
@ObjectType()
export class CartEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => MenuEntity)
  @ManyToOne(() => MenuEntity)
  menu: MenuEntity;

  @Field(() => [CartItemEntity])
  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity[];
}
