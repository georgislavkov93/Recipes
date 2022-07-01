import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
})
export class AllRecipesComponent implements OnInit {
  constructor(private readonly http: HttpService) {}
  recipes: any = [];
  apiURL: string = environment.api;

  ngOnInit(): void {
    this.http.getAllRecipes().subscribe((res) => {
      this.recipes = res;
    });
  }
}
