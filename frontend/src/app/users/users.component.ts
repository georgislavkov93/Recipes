import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  constructor(
    private readonly http: HttpService,
    private readonly route: ActivatedRoute
  ) {}

  recipes: any = [];
  apiURL: string = environment.api;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.http.getRecipesByUserId(params.id).subscribe((res) => {
        this.recipes = res;
      });
    });
  }
}
