import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CandidaturesComponent } from 'src/app/pages/candidatures/candidatures.component';
import { SuperviseursComponent } from 'src/app/pages/superviseurs/superviseurs.component';
import { StagiairesComponent } from 'src/app/pages/stagiaires/stagiaires.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'candidatures',   component: CandidaturesComponent},
    { path: 'superviseurs',   component: SuperviseursComponent },
    { path: 'stagiaires',      component: StagiairesComponent }
];
