export interface Organization {
  name: string;
  active: boolean;
}

export type LoadingOrganization = IsLoadingOrganization | LoadedOrganization | UnknownOrganization;

export interface IsLoadingOrganization {
  id: string;
  isLoading: true;
}

export interface LoadedOrganization {
  id: string;
  isLoading: false;
  organization: Organization;
}

export interface UnknownOrganization {
  id: string;
  isLoading: false;
  organization: null;
}
