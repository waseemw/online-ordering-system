import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModificationEntity } from './modification.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ModificationItemEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field(() => ModificationEntity)
  @ManyToOne(
    () => ModificationEntity,
    (modification) => modification.selectionItems,
  )
  modification: ModificationEntity;
}
