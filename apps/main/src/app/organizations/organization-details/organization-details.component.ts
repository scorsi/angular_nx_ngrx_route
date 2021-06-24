import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {ORGANIZATIONS_FEATURE_KEY, OrganizationsPartialState} from "../+state/organizations.reducer";
import {LoadingOrganization, Organization} from "../+state/organizations.model";

@Component({
  selector: 'calicut-ui-organization-details',
  templateUrl: './organization-details.component.html',
})
export class OrganizationDetailsComponent {
  loadingOrganization: LoadingOrganization | {isLoading: true} = {isLoading: true};

  constructor(route: ActivatedRoute, store: Store<OrganizationsPartialState>) {
    store.select(ORGANIZATIONS_FEATURE_KEY).subscribe(t => {
      const organizationName = route.snapshot.paramMap.get('organizationName') || '';
      this.loadingOrganization = t.entities[organizationName] || {isLoading: true};
    });
  }
}
