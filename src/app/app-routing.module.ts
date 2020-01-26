import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CampaignsCreateComponent } from './components/campaigns-create/campaigns-create.component';
import { MainComponent } from './components/main/main.component';
import { AuthService } from 'src/app/services/auth.service';


const routes: Routes = [
  { path: 'main',
    component: MainComponent ,
    canActivate: [AuthService],
    children:[
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
      {path:"campaigns", component: CampaignsComponent},
      {path:"create-campaign/:id", component: CampaignsCreateComponent}

    ]
  },
  { path: 'login',component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
