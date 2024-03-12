# 0x02RecipeApp

### App Routing Steps

- create a routing module i.e file named `app-routing.module.ts`. It can be named whatever you like
- Create a typescript class and add the `@NgModule` decorator to convert it to a module

        import { NgModule } from "@angular/core";

        @NgModule({

        })
        export class AppRoutingModule {

        }

### Adding a Route

        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { RecipesComponent } from './recipes/recipes.component';
        import { ShoppingListComponent } from './shopping-list/shopping-list.component';

        const appRoutes: Routes = [
        { path: '', redirectTo: '/recipes' },
        {
            path: 'recipes',
            component: RecipesComponent,
        },
        {
            path: 'shopping-list',
            component: ShoppingListComponent,
        },
        ];

        @NgModule({
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule],
        })
        export class AppRoutingModule {}

- export the configured `RouterModule`
- import it in the main module i.e, `app.module.ts` i.e,

        @NgModule({
        imports: [AppRoutingModule]
        })

### Configuring the Outlet

- Mark where the components should be conditionally rendered:

        <div class="app-container">
            <app-header (linkChangeEmitter)="onLinkClicked($event)"></app-header>
            <main class="main">
                <router-outlet></router-outlet>
            </main>
        </div>

### Configure Links

        <ul class="nav__links">
            <li routerLinkActive="nav__link--active" class="nav__link">
                <a routerLink="/recipes">recipes</a>
            </li>
            <li routerLinkActive="nav__link--active" class="nav__link">
                <a routerLink="/shopping-list">shopping list</a>
            </li>
        </ul>

### Child Routes

        const appRoutes: Routes = [
        { path: '', redirectTo: '/recipes', pathMatch: 'full' },
        {
            path: 'recipes',
            component: RecipesComponent,
            children: [
            { path: '', component: RecipeInitComponent },
            { path: ':id', component: RecipeDetailComponent },
            ],
        },
        {
            path: 'shopping-list',
            component: ShoppingListComponent,
        },
        ];

##### Usage

        <section class="recipes">
        <div class="recipe__list">
            <app-recipe-list></app-recipe-list>
        </div>
        <div class="recipe__details">
            <router-outlet></router-outlet>
        </div>
        </section>
