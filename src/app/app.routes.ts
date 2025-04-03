import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    //Al no poner exportacion por defecto se agrega el .then
    loadChildren: () =>
      import('./reactive/reactive.routes').then((m) => m.reactiveRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  },
];
