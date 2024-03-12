import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChangedEmitter = new Subject<Ingredient[]>();
  ingredientEditEmitter = new Subject<number>();
  private ingredients: Ingredient[] = [
    { name: 'Spaghetti', amount: 200 },
    { name: 'Eggs', amount: 2 },
    { name: 'Pancetta', amount: 150 },
    { name: 'Parmesan Cheese', amount: 50 },
    { name: 'Black Pepper', amount: 1 },
  ];
  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }
  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChangedEmitter.next(this.ingredients.slice());
  }
}
