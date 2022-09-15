import { DataSource, Entity } from 'typeorm';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { CartEntity } from 'src/entities/cart.entity';
import { ModificationItemEntity } from '../entities/modification-item.entity';

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
    @Args('menuItemId') menuItemId: string,
    @Args('modificationItemIds', { type: () => [String] })
    modificationItemIds: string[],
    @Args('freeFormText', { nullable: true }) freeFormText: string,
  ) {
    return await this.cartRepo.save({
      menuItem: { id: menuItemId },
      modificationItems: modificationItemIds.map(
        (id) => ({ id } as Partial<ModificationItemEntity>),
      ),
      freeFormText: freeFormText,
    });
  }
}
