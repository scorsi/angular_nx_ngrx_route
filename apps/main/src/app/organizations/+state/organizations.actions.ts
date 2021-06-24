import {createAction, props} from '@ngrx/store';
import {Organization} from "./organizations.model";

export const manyOrganizationsUpdated = createAction(
  '[Organizations] Many Organizations Updated',
  props<{ organizations: Organization[] }>()
);

export const oneOrganizationUpdated = createAction(
  '[Organizations] One Organization Updated',
  props<{ organization: Organization }>()
);

export const oneOrganizationNotFound = createAction(
  '[Organizations] One Organization Not Found',
  props<{ name: string }>()
);
