import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModificationItemEntity } from '../entities/modification-item.entity';
import { DataSource } from 'typeorm';

@Resolver(() => ModificationItemEntity)
export class ModificationItemResolver {
  private modificationItemRepo = this.ds.getRepository(ModificationItemEntity);

  constructor(private ds: DataSource) {}

  @Query(() => ModificationItemEntity)
  async modificationItem(@Args('id') id: string) {
    return await this.modificationItemRepo.findOneBy({ id });
  }

  @Mutation(() => ModificationItemEntity)
  async createModificationItem(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('modificationId') modificationId: string,
  ) {
    return await this.modificationItemRepo.save({
      name,
      price,
      modification: { id: modificationId },
    });
  }
}
