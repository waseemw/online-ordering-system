import { DataSource, Entity } from 'typeorm';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { CartEntity } from '../entities/cart.entity';

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
  async createCart(@Args('menuId') menuId: string) {
    return await this.cartRepo.save({
      menu: { id: menuId },
    });
  }
}
