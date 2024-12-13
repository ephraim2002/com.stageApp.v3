import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AuthGuardService } from './services/auth-guard.service';    
import { PostulerComponent } from './pages/postuler/postuler.component';

const routes: Routes =[
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
   {
    path: '',
    canActivate: [AuthGuardService],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, 
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  //     }
  //   ]
  // }, 
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // },
  {
    path:'acceuil',
    component:AcceuilComponent
  },
  {
    path:'connexion',
    component:ConnexionComponent
  },
  {
    path:'postuler',
    component:PostulerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
