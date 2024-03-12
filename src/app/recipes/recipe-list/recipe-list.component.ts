import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription = new Subscription();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription =
      this.recipeService.recipesChangedEmitter.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
  addNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
