import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { finishpageComponent } from './finishpage/finishpage.component';
import { pomodoroPageComponent } from './pomodoropage/pomodoropage.component';


//routing path to finish page

const routes: Routes = [
  { path: 'landing', component: pomodoroPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'finish', component: finishpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
