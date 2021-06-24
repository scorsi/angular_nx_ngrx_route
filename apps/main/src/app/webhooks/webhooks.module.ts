import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {WebhooksEffects} from "./+state/webhooks.effects";
import {reducer, WEBHOOKS_FEATURE_KEY} from "./+state/webhooks.reducer";
import {WebhooksBackendService} from "./webhooks-backend.service";
import { WebhooksListComponent } from './webhooks-list/webhooks-list.component';
import { WebhookDetailsComponent } from './webhook-details/webhook-details.component';

@NgModule({
  declarations: [
    WebhooksListComponent,
    WebhookDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: 'organization/:organizationName/webhooks', component: WebhooksListComponent},
      {path: 'organization/:organizationName/webhook/:webhookId', component: WebhookDetailsComponent}
    ]),
    EffectsModule.forFeature([WebhooksEffects]),
    StoreModule.forFeature(WEBHOOKS_FEATURE_KEY, reducer)
  ],
  providers: [WebhooksBackendService]
})
export class WebhooksModule {
}
