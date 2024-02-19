import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../BeerList/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'add-beer',
        loadChildren: () => import('../AddBeer/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'add-beer/:id',
        loadChildren: () => import('../AddBeer/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
