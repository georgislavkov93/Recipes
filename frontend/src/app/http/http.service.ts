import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
  };

  // Method to login in the application and get JWT token
  login(data: any) {
    return this.http.post<any>(`${environment.api}/auth/login`, data);
  }

  // Method to register in the application
  register(data: any) {
    return this.http.post<any>(`${environment.api}/users`, data);
  }

  // Method to get the user profile with JWT authentication
  profile(): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/users/profile`,
      this.httpOptions
    );
  }

  // Method to get all recipes in Database
  getAllRecipes(): Observable<any> {
    return this.http.get<any>(`${environment.api}/recipes`);
  }

  // Method to get  recipes by _id in Database
  getRecipesById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api}/recipes/${id}`);
  }

  // Method to get  recipes by _id in Database
  getRecipesByUser(): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/recipes/by-user`,
      this.httpOptions
    );
  }

  // Method to get  recipes by user _id in params
  getRecipesByUserId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api}/recipes/user/${id}`);
  }

  // Method to create recipes in Database
  createRecipe(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/recipes`,
      data,
      this.httpOptions
    );
  }

  // Method to update recipes in Database
  updateRecipe(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${environment.api}/recipes/${id}`,
      data,
      this.httpOptions
    );
  }

  // Method to delete recipes in Database
  deleteRecipe(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.api}/recipes/${id}`,
      this.httpOptions
    );
  }
}
