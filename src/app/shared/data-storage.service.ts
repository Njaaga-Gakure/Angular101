import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { Subject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  fetchRecipeEmitter = new Subject<Recipe[]>();
  url: string =
    'https://recipes-app-57835-default-rtdb.firebaseio.com/recipes.json';
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}
  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.httpClient.put(this.url, recipes).subscribe();
  }
  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.url).pipe(
      map((recipes) => {
        const modifiedRecipes = recipes.map((recipe) => {
          return !recipe['ingredients']
            ? { ...recipe, ingredients: [] }
            : recipe;
        });
        console.log(modifiedRecipes);

        return modifiedRecipes;
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
