import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  ORGANIZATIONS_FEATURE_KEY,
  organizationsAdapter,
  OrganizationsPartialState
} from "../+state/organizations.reducer";
import {Observable} from "rxjs";
import {LoadedOrganization, Organization} from "../+state/organizations.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'calicut-ui-organizations-list',
  templateUrl: './organizations-list.component.html',
})
export class OrganizationsListComponent {
  organizations$: Observable<Organization[]>;

  constructor(store: Store<OrganizationsPartialState>) {
    this.organizations$ = store.select(ORGANIZATIONS_FEATURE_KEY)
      .pipe(
        map(organizationsAdapter.getSelectors().selectAll),
        map((organizations) => organizations.filter((o) => o.isLoading === false && o.organization != null) as LoadedOrganization[]),
        map((organizations) => organizations.map((o) => o.organization))
      );
  }
}
