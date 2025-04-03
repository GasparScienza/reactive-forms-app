import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-Up',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-ip',
      },
    ],
  },
];

export default authRoutes;
