import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('home/HomeApp').then(m => m.AppModule) },
  // { path: 'micro-frontend2', loadChildren: () => import('micro-frontend2/Module').then(m => m.MicroFrontend2Module) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
