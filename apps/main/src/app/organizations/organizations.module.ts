import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationsBackendService} from "./organizations-backend.service";
import {HttpClientModule} from "@angular/common/http";
import {OrganizationsListComponent} from './organizations-list/organizations-list.component';
import {StoreModule} from "@ngrx/store";
import {ORGANIZATIONS_FEATURE_KEY, reducer} from "./+state/organizations.reducer";
import {EffectsModule} from "@ngrx/effects";
import {OrganizationsEffects} from "./+state/organizations.effects";
import {RouterModule} from "@angular/router";
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';

@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: 'organizations', component: OrganizationsListComponent},
      {path: 'organization/:organizationName', component: OrganizationDetailsComponent}
    ]),
    EffectsModule.forFeature([OrganizationsEffects]),
    StoreModule.forFeature(ORGANIZATIONS_FEATURE_KEY, reducer)
  ],
  providers: [OrganizationsBackendService]
})
export class OrganizationsModule {
}
