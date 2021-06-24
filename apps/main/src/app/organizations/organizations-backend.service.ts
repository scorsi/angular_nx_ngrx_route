import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organization} from "./+state/organizations.model";

const API_URL = 'https://calicut-315113.ew.r.appspot.com/api/v1/organizations/';

@Injectable()
export class OrganizationsBackendService {
  constructor(private readonly httpClient: HttpClient) {
  }

  fetchManyOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(API_URL);
  }

  fetchOneOrganization(name: string): Observable<Organization> {
    return this.httpClient.get<Organization>(API_URL + name);
  }
}
