import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModificationEntity } from 'src/entities/modification.entity';
import { DataSource } from 'typeorm';

@Resolver(() => ModificationEntity)
export class ModificationResolver {
  private modificationRepo = this.ds.getRepository(ModificationEntity);

  constructor(private ds: DataSource) {}

  @Query(() => ModificationEntity)
  async modification(@Args('id') id: string) {
    return await this.modificationRepo.findOneBy({ id });
  }

  @Mutation(() => ModificationEntity)
  async createModification(
    @Args('name') name: string,
    @Args('selectionCount') selectionCount: number,
    @Args('type') type: 'OPTIONAL' | 'REQUIRED',
    @Args('menuItemId') menuItemId: string,
  ) {
    return await this.modificationRepo.save({
      name,
      selectionCount,
      type,
      menuItem: { id: menuItemId },
    });
  }
}
