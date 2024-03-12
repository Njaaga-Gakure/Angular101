import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  itemName: string = '';
  itemAmount: string = '';
  editMode: boolean = false;
  itemId: number;
  editSubscription: Subscription;

  ngOnInit(): void {
    this.editSubscription =
      this.shoppingListService.ingredientEditEmitter.subscribe(
        (index: number) => {
          this.editMode = true;
          this.itemId = index;
          const ingredient: Ingredient = this.shoppingListService.getIngredient(
            this.itemId
          );
          this.itemName = ingredient.name;
          this.itemAmount = `${ingredient.amount}`;
        }
      );
  }
  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
  onListItemSubmit() {
    if (!this.editMode) {
      this.shoppingListService.addIngredient({
        name: this.itemName,
        amount: +this.itemAmount,
      });
    } else {
      this.shoppingListService.updateIngredient(
        { name: this.itemName, amount: +this.itemAmount },
        this.itemId
      );
      this.editMode = false;
    }
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.itemId);
    this.onClear();
  }
}
