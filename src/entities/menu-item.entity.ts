import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { ModificationEntity } from './modification.entity';
import { CategoryEntity } from './category.entity';

@ObjectType()
@Entity()
export class MenuItemEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, (category) => category.menuItems)
  category: CategoryEntity;

  @Field(() => [ModificationEntity])
  @OneToMany(() => ModificationEntity, (modification) => modification.menuItem)
  modifications: ModificationEntity[];

  @Field()
  @Column()
  freeTextModification: boolean;
}
