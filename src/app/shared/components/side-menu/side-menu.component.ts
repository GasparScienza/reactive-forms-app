import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path != '**')
    .map((items) => ({
      title: `${items.title}`,
      route: `reactive/${items.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];
  countryMenu: MenuItem[] = [
    {
      title: 'Paises',
      route: './country',
    },
  ];
}
