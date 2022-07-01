import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  constructor(private readonly http: HttpService) {}

  recipes: any = [];
  apiURL: string = environment.api;

  ngOnInit(): void {
    this.getRecipesByUser();
  }

  getRecipesByUser() {
    this.http.getRecipesByUser().subscribe((res) => {
      this.recipes = res;
    });
  }

  delete(id: string) {
    this.http.deleteRecipe(id).subscribe((res) => {
      this.getRecipesByUser();
    });
  }
}
