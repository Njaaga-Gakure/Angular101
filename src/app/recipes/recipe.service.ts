import { EventEmitter } from '@angular/core';
import { Recipe } from './recipes.model';
import { Subject } from 'rxjs';

export class RecipeService {
  clickedRecipeEmitter = new EventEmitter<Recipe>();
  recipesChangedEmitter = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChangedEmitter.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChangedEmitter.next(this.recipes.slice());
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id - 1];
  }
  updateRecipe(index: number, recipe: Recipe) {
    console.log('index' + index);

    this.recipes[index] = recipe;
    this.recipesChangedEmitter.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    console.log('delete');

    this.recipes.splice(index, 1);
    this.recipesChangedEmitter.next(this.recipes.slice());
  }
}
