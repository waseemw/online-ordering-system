import { DataSource, Entity } from 'typeorm';
import { Args, Mutation, ObjectType, Query } from '@nestjs/graphql';
import { MenuEntity } from '../entities/menu.entity';

@Entity()
@ObjectType()
export class MenuResolver {
  private menuRepo = this.ds.getRepository(MenuEntity);

  constructor(private ds: DataSource) {}

  @Query(() => MenuEntity)
  async menu(@Args('id') id: string) {
    return await this.menuRepo.findOneBy({ id });
  }

  @Mutation(() => MenuEntity)
  async createMenu(@Args('name') name: string) {
    return await this.menuRepo.save({
      name,
    });
  }
}
