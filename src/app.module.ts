import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import mongoose module
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/recipe-app', {
    useUnifiedTopology: true, useNewUrlParser: true
  }),
    RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
