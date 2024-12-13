import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { StagiairesComponent } from './pages/stagiaires/stagiaires.component';
import { CandidaturesComponent } from './pages/candidatures/candidatures.component';
import { SuperviseursComponent } from './pages/superviseurs/superviseurs.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { PostulerComponent } from './pages/postuler/postuler.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule
    
  
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    StagiairesComponent,
   
    SuperviseursComponent,
        AcceuilComponent,
        ConnexionComponent,
        PostulerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
