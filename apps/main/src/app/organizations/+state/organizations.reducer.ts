import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {LoadingOrganization} from './organizations.model';
import {oneOrganizationNotFound, manyOrganizationsUpdated, oneOrganizationUpdated} from "./organizations.actions";

export const ORGANIZATIONS_FEATURE_KEY = 'organizations';

export interface OrganizationsState extends EntityState<LoadingOrganization> {
}

export interface OrganizationsPartialState {
  readonly [ORGANIZATIONS_FEATURE_KEY]: OrganizationsState;
}

export const organizationsAdapter: EntityAdapter<LoadingOrganization> = createEntityAdapter<LoadingOrganization>();

export const initialState: OrganizationsState = organizationsAdapter.getInitialState({});

const organizationsReducer = createReducer(
  initialState,
  on(manyOrganizationsUpdated, (state, {organizations}) =>
    organizationsAdapter.addMany(organizations.map((organization) => ({id: organization.name, isLoading: false, organization})), state)
  ),
  on(oneOrganizationUpdated, (state, {organization}) =>
    organizationsAdapter.addOne({id: organization.name, isLoading: false, organization}, state)
  ),
  on(oneOrganizationNotFound, (state, {name}) =>
    organizationsAdapter.addOne({id: name, isLoading: false, organization: null}, state)
  )
);

export function reducer(state: OrganizationsState | undefined, action: Action) {
  return organizationsReducer(state, action);
}
