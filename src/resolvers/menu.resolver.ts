import { DataSource, Entity } from 'typeorm';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { CartEntity } from 'src/entities/cart.entity';
import { CartItemEntity } from '../entities/cart-item.entity';

@Entity()
@ObjectType()
export class CartResolver {
  private cartRepo = this.ds.getRepository(CartEntity);

  constructor(private ds: DataSource) {}

  @Query(() => CartEntity)
  async cart(@Args('id') id: string) {
    return await this.cartRepo.findOneBy({ id });
  }

  @Mutation(() => CartEntity)
  async createCart(
    @Args('menuId') menuId: string,
    @Args('cartItemIds', { type: () => [String] }) cartItemIds: string[],
  ) {
    return await this.cartRepo.save({
      menu: { id: menuId },
      cartItems: cartItemIds.map((id) => ({ id } as Partial<CartItemEntity>)),
    });
  }
}
