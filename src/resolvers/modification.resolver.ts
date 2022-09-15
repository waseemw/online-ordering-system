import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { DataSource } from 'typeorm';

@Resolver(() => MenuItemEntity)
export class MenuItemResolver {
  private menuItemRepo = this.ds.getRepository(MenuItemEntity);

  constructor(private ds: DataSource) {}

  @Query(() => MenuItemEntity)
  async menuItem(@Args('id') id: string) {
    return await this.menuItemRepo.findOneBy({ id });
  }

  @Mutation(() => MenuItemEntity)
  async createMenuItem(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('menuItemId') categoryId: string,
  ) {
    return await this.menuItemRepo.save({
      name,
      price,
      category: { id: categoryId },
    });
  }
}
