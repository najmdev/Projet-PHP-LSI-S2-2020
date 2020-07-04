import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TableauDeBordComponent } from './investigation/tableau-de-bord/tableau-de-bord.component';
import { InvestigationsComponent } from './investigation/investigations/investigations.component';
import { ArchiveComponent } from './investigation/archive/archive.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'investigations', component: InvestigationsComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
