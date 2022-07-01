import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllRecipesComponent } from './recipes/all-recipes/all-recipes.component';
import { SingleRecipesComponent } from './recipes/single-recipes/single-recipes.component';
import { RecipesComponent } from './dashboard/recipes/recipes.component';
import { EditRecipesComponent } from './dashboard/edit-recipes/edit-recipes.component';
import { NewRecipesComponent } from './dashboard/new-recipes/new-recipes.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  { path: '', component: AllRecipesComponent, pathMatch: 'full' },
  { path: 'recipe/edit', component: EditRecipesComponent, pathMatch: 'full' },
  { path: 'users/:user/recipe/:id', component: SingleRecipesComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'recipes', component: RecipesComponent, pathMatch: 'full' },
      {
        path: 'recipes/edit/:id',
        component: EditRecipesComponent,
        pathMatch: 'full',
      },
      {
        path: 'recipes/new',
        component: NewRecipesComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: 'users/:id', component: UsersComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
