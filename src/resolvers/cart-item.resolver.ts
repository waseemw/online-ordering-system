import { DataSource, Entity } from 'typeorm';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { CartItemEntity } from '../entities/cart-item.entity';
import { ModificationItemEntity } from '../entities/modification-item.entity';

@Entity()
@ObjectType()
export class CartItemResolver {
  private cartItemRepo = this.ds.getRepository(CartItemEntity);

  constructor(private ds: DataSource) {}

  @Query(() => CartItemEntity)
  async cartItem(@Args('id') id: string) {
    return await this.cartItemRepo.findOneBy({ id });
  }

  @Mutation(() => CartItemEntity)
  async createCartItem(
    @Args('menuItemId') menuItemId: string,
    @Args('modificationItemIds', { type: () => [String] })
    modificationItemIds: string[],
    @Args('cartId') cartId: string,
    @Args('freeFormText', { nullable: true }) freeFormText: string,
  ) {
    return await this.cartItemRepo.save({
      menuItem: { id: menuItemId },
      modificationItems: modificationItemIds.map(
        (id) => ({ id } as Partial<ModificationItemEntity>),
      ),
      freeFormText: freeFormText,
      cart: { id: cartId },
    });
  }
}
