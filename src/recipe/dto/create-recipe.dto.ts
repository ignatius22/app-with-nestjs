import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDTO{
	@IsNotEmpty()
	title: String;

	@IsNotEmpty()
	description: String;

	@IsNotEmpty()
	category: String;

	@IsNotEmpty()
	ingredients: Array<String>;

	@IsNotEmpty()
	image_url: String;

	@IsNotEmpty()
	instructions: String;
}