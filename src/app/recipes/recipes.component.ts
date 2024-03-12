import { Component } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipe: Recipe;

  onRecipeClicked(recipe: Recipe) {
    this.recipe = recipe;
  }
}
