import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {LoadingWebhook} from "./webhooks.model";
import {manyWebhooksUpdated, oneWebhookUpdated, oneWebhookNotFound} from "./webhooks.actions";

export const WEBHOOKS_FEATURE_KEY = 'webhooks';

export interface WebhooksState extends EntityState<LoadingWebhook> {
}

export interface WebhooksPartialState {
  readonly [WEBHOOKS_FEATURE_KEY]: WebhooksState;
}

export const webhooksAdapter: EntityAdapter<LoadingWebhook> = createEntityAdapter<LoadingWebhook>();

export const initialState: WebhooksState = webhooksAdapter.getInitialState({});

const webhooksReducer = createReducer(
  initialState,
  on(manyWebhooksUpdated, (state, {webhooks}) =>
    webhooksAdapter.addMany(webhooks.map((webhook) => ({id: webhook.id, isLoading: false, webhook})), state)
  ),
  on(oneWebhookUpdated, (state, {webhook}) =>
    webhooksAdapter.addOne({id: webhook.id, isLoading: false, webhook}, state)
  ),
  on(oneWebhookNotFound, (state, {id}) =>
    webhooksAdapter.addOne({id: id, isLoading: false, webhook: null}, state)
  )
);

export function reducer(state: WebhooksState | undefined, action: Action) {
  return webhooksReducer(state, action);
}
