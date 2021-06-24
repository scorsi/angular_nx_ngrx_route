import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/angular';
import {WebhooksBackendService} from "../webhooks-backend.service";
import {WEBHOOKS_FEATURE_KEY, WebhooksPartialState} from "./webhooks.reducer";
import {ActivatedRouteSnapshot} from "@angular/router";
import {map} from "rxjs/operators";
import {of} from "rxjs";
import {WebhooksListComponent} from "../webhooks-list/webhooks-list.component";
import {manyWebhooksUpdated, oneWebhookNotFound, oneWebhookUpdated} from "./webhooks.actions";
import {WebhookDetailsComponent} from "../webhook-details/webhook-details.component";

@Injectable()
export class WebhooksEffects {
  webhooks$ = createEffect(() =>
    this.dataPersistence.navigation(WebhooksListComponent, {
      run: (route: ActivatedRouteSnapshot) => {
        const organizationName = route.paramMap.get('organizationName') || '';
        return this.backend
          .fetchManyWebhooks(organizationName)
          .pipe(map(webhooks => manyWebhooksUpdated({webhooks})));
      },
      onError: (r: ActivatedRouteSnapshot, error) => {
        console.error('Error', error);
        throw error;
      }
    })
  );

  webhook$ = createEffect(() =>
    this.dataPersistence.navigation(WebhookDetailsComponent, {
      run: (route: ActivatedRouteSnapshot, state: WebhooksPartialState) => {
        const webhookId = parseInt(route.paramMap.get('webhookId') || '0');
        if (!state[WEBHOOKS_FEATURE_KEY].entities[webhookId]) {
          return this.backend
            .fetchOneWebhook(webhookId)
            .pipe(map(webhook => oneWebhookUpdated({webhook})));
        } else {
          // don't fetch if the organization is already in the store.
          return of<any>();
        }
      },
      onError: (route: ActivatedRouteSnapshot, error) => {
        const webhookId = parseInt(route.paramMap.get('webhookId') || '0');
        return oneWebhookNotFound({id: webhookId});
      }
    })
  );

  constructor(
    private readonly dataPersistence: DataPersistence<WebhooksPartialState>,
    private readonly backend: WebhooksBackendService,
    private readonly actions: Actions
  ) {
  }
}
