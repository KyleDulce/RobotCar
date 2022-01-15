import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManualControlPanelComponent } from './components/manual-control-panel/manual-control-panel.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"control", component:ManualControlPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
