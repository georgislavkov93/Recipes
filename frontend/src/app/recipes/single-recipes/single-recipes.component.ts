import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-recipes',
  templateUrl: './single-recipes.component.html',
})
export class SingleRecipesComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpService
  ) {}
  recipe!: any;
  apiURL: string = environment.api;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.http.getRecipesById(params.id).subscribe((res) => {
        this.recipe = res;
      });
    });
  }
}
