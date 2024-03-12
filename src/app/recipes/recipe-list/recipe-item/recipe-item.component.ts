import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor(private router: Router) {}
  onRecipeClick() {
    this.router.navigate(['/recipes', this.index + 1]);
  }
}
