import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './authorization/auth.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path : 'auth', component : AuthComponent},
  {path : '',   redirectTo: '/auth', pathMatch: 'full' },
  {path : 'main', component : MainComponent},
  {path : 'main/:channelId', component : MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
