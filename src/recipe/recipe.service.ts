import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './interfaces/recipe.interface';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { GetRecipesFilterDTO } from './dto/get-recipes-filter.dto';
@Injectable()
export class RecipeService {
  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>) { }
  
  async addRecipe(createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    const newRecipe = await new this.recipeModel(createRecipeDTO)
    return newRecipe.save()
  }
  async getAllRecipe(): Promise<Recipe[]>{
    const recipes = await this.recipeModel.find().exec()
    return recipes;
  }
   // get filtered recipes
    async getFilteredRecipes(filterDTO: GetRecipesFilterDTO): Promise<Recipe[]> {
      const { category, search } = filterDTO;
      let recipes = await this.getAllRecipe();
      
      if (search) {
        recipes = recipes.filter(recipe => 
          recipe.title.includes(search) ||
          recipe.description.includes(search)
        );
      }

      if (category) {
        recipes = recipes.filter(recipe => recipe.category === category)
      }
 
      return recipes;
    }

  async getRecipe(recipeID): Promise<Recipe>{
    const recipe = await this.recipeModel.findById(recipeID).exec()
    return recipe;
  }
    async updateRecipe(recipeID, createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
      const updatedRecipe = await this.recipeModel
          .findByIdAndUpdate(recipeID, createRecipeDTO, { new: true });
      return updatedRecipe;
    }
  
    async deleteRecipe(recipeID): Promise<any> {
      const deletedRecipe = await this.recipeModel.findByIdAndRemove(recipeID);
      return deletedRecipe;
    }
}