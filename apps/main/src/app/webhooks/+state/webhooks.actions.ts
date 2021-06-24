import {createAction, props} from '@ngrx/store';
import {Webhook} from "./webhooks.model";

export const manyWebhooksUpdated = createAction(
  '[Webhooks] Many Webhooks Updated',
  props<{ webhooks: Webhook[] }>()
);

export const oneWebhookUpdated = createAction(
  '[Webhooks] One Webhook Updated',
  props<{ webhook: Webhook }>()
);

export const oneWebhookNotFound = createAction(
  '[Webhooks] Webhook Not Found',
  props<{ id: number }>()
);
