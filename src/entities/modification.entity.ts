import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModificationItemEntity } from './modification-item.entity';
import { MenuItemEntity } from './menu-item.entity';

@ObjectType()
@Entity()
export class ModificationEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  selectionCount: number;

  @Field()
  @Column()
  type: 'OPTIONAL' | 'REQUIRED';

  @Field(() => [ModificationItemEntity])
  @OneToMany(() => ModificationItemEntity, (mItem) => mItem.modification)
  selectionItems: ModificationItemEntity[];

  @Field(() => MenuItemEntity)
  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.modifications)
  menuItem: MenuItemEntity;
}
