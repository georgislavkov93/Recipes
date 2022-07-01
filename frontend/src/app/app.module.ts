import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllRecipesComponent } from './recipes/all-recipes/all-recipes.component';
import { SingleRecipesComponent } from './recipes/single-recipes/single-recipes.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './dashboard/recipes/recipes.component';
import { CommonModule } from '@angular/common';
import { EditRecipesComponent } from './dashboard/edit-recipes/edit-recipes.component';
import { NewRecipesComponent } from './dashboard/new-recipes/new-recipes.component';
import { UsersComponent } from './users/users.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { sanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AllRecipesComponent,
    EditRecipesComponent,
    SingleRecipesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RecipesComponent,
    NewRecipesComponent,
    UsersComponent,
    sanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
