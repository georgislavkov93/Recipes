import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
})
export class EditRecipesComponent implements OnInit {
  constructor(
    private readonly http: HttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  recipe!: any;
  apiURL: string = environment.api;
  filePath!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.http.getRecipesById(params.id).subscribe((res) => {
        this.recipe = res;

        this.filePath = `${this.apiURL}/public/${this.recipe.image}`;
      });
    });
  }
  recipeForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    preparation_time: new UntypedFormControl('', Validators.required),
    level: new UntypedFormControl('', Validators.required),
    serves: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    file_source: new UntypedFormControl('', Validators.required),
    file: new UntypedFormControl('', Validators.required),
  });

  get controls() {
    return this.recipeForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.recipeForm.patchValue({
        file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateRecipe(id: string, data: any): void {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('preparation_time', data.preparation_time);
    formData.append('level', data.level);
    formData.append('serves', data.serves);
    formData.append('description', data.description);
    formData.append('file', data.file);

    this.http.updateRecipe(id, formData).subscribe(
      (res: any) => {
        this.router.navigate(['/dashboard/recipes']);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
