import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);

  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  borders = signal<Country[]>([]);
  countriesByRegion = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanup) => {
    const regionsSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      regionsSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('limpio');
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        console.log({ countries });
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
        console.log({ borders });
      });
  }
}
