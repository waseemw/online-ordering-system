import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryEntity } from '../entities/category.entity';
import { DataSource } from 'typeorm';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  private categoryRepo = this.ds.getRepository(CategoryEntity);

  constructor(private ds: DataSource) {}

  @Query(() => CategoryEntity)
  async category(@Args('id') id: string) {
    return await this.categoryRepo.findOneBy({ id });
  }

  @Mutation(() => CategoryEntity)
  async createCategory(
    @Args('name') name: string,
    @Args('menuId') menuId: string,
  ) {
    return await this.categoryRepo.save({ name, menu: { id: menuId } });
  }
}
