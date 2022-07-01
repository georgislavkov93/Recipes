import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
})
export class NewRecipesComponent implements OnInit {
  constructor(
    private readonly http: HttpService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  filePath!: string;

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

  createRecipe(data: any): void {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('preparation_time', data.preparation_time);
    formData.append('level', data.level);
    formData.append('serves', data.serves);
    formData.append('description', data.description);
    formData.append('file', data.file);

    this.http.createRecipe(formData).subscribe(
      (res: any) => {
        this.router.navigate(['/dashboard/recipes']);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
