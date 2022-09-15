import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { MenuResolver } from './resolvers/menu.resolver';
import { CartResolver } from './resolvers/cart.resolver';
import { CategoryResolver } from './resolvers/categoryResolver';
import { CartItemResolver } from './resolvers/cart-item.resolver';
import { MenuItemResolver } from './resolvers/menu-item.resolver';
import { ModificationResolver } from './resolvers/modification.resolver';
import { ModificationItemResolver } from './resolvers/modification-item.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

// bootstrap();

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    MenuResolver,
    CategoryResolver,
    CartResolver,
    CartItemResolver,
    MenuItemResolver,
    ModificationResolver,
    ModificationItemResolver,
  ]);
  console.log(printSchema(schema));
}

generateSchema();
