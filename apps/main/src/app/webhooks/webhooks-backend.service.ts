import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Webhook} from "./+state/webhooks.model";

const API_URL = 'https://calicut-315113.ew.r.appspot.com/api/v1/webhooks/';

@Injectable()
export class WebhooksBackendService {
  constructor(private httpClient: HttpClient) {
  }

  fetchManyWebhooks(organizationName: string): Observable<Webhook[]> {
    return this.httpClient.get<Webhook[]>(`${API_URL}?organization_name=${organizationName}`);
  }

  fetchOneWebhook(id: number): Observable<Webhook> {
    return this.httpClient.get<Webhook>(API_URL + id);
  }
}
