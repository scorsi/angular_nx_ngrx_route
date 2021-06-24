import {Component} from '@angular/core';
import {LoadedWebhook, Webhook} from "../+state/webhooks.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {WEBHOOKS_FEATURE_KEY, webhooksAdapter, WebhooksPartialState} from "../+state/webhooks.reducer";

@Component({
  selector: 'calicut-ui-webhooks-list',
  templateUrl: './webhooks-list.component.html',
})
export class WebhooksListComponent {
  organizationName: string
  webhooks$: Observable<Webhook[]>

  constructor(route: ActivatedRoute, store: Store<WebhooksPartialState>) {
    this.organizationName = route.snapshot.paramMap.get('organizationName') || '';

    this.webhooks$ = store.select(WEBHOOKS_FEATURE_KEY)
      .pipe(
        map(webhooksAdapter.getSelectors().selectAll),
        map((webhooks) => webhooks.filter((w) => w.isLoading === false && w.webhook != null) as LoadedWebhook[]),
        map((webhooks) => webhooks.map((w) => w.webhook))
      );
  }
}
