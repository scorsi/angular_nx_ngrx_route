import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/angular';
import {manyOrganizationsUpdated, oneOrganizationNotFound, oneOrganizationUpdated} from './organizations.actions';
import {ActivatedRouteSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {OrganizationsListComponent} from "../organizations-list/organizations-list.component";
import {OrganizationsBackendService} from "../organizations-backend.service";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {ORGANIZATIONS_FEATURE_KEY, OrganizationsPartialState} from "./organizations.reducer";
import {of} from "rxjs";

@Injectable()
export class OrganizationsEffects {
  organizations$ = createEffect(() =>
    this.dataPersistence.navigation(OrganizationsListComponent, {
      run: (r: ActivatedRouteSnapshot) => {
        return this.backend
          .fetchManyOrganizations()
          .pipe(map(organizations => manyOrganizationsUpdated({organizations})));
      },
      onError: (r: ActivatedRouteSnapshot, error) => {
        console.error('Error', error);
        throw error;
      }
    })
  );

  organization$ = createEffect(() =>
    this.dataPersistence.navigation(OrganizationDetailsComponent, {
      run: (route: ActivatedRouteSnapshot, state: OrganizationsPartialState) => {
        const name = route.paramMap.get('organizationName') || '';
        if (!state[ORGANIZATIONS_FEATURE_KEY].entities[name]) {
          return this.backend
            .fetchOneOrganization(name)
            .pipe(map(organization => oneOrganizationUpdated({organization})));
        } else {
          // don't fetch if the organization is already in the store.
          return of<any>();
        }
      },
      onError: (route: ActivatedRouteSnapshot, error) => {
        const name = route.paramMap.get('organizationName') || '';
        return oneOrganizationNotFound({name});
      }
    })
  );

  constructor(
    private readonly dataPersistence: DataPersistence<OrganizationsPartialState>,
    private readonly backend: OrganizationsBackendService,
    private readonly actions: Actions
  ) {
  }
}
