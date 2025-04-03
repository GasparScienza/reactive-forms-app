import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['The Last Of Us', Validators.required],
        ['The Walking Dead', Validators.required],
      ],
      Validators.minLength(3)
    ),
  });

  newFavorite = new FormControl('', Validators.required);

  addGame() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    console.log(this.newFavorite.value);
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  deletedGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
