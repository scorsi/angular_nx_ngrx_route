export interface Webhook {
  id: number;
  name: string;
  active: boolean;
}

export type LoadingWebhook = IsLoadingWebhook | LoadedWebhook | UnknownWebhook;

export interface IsLoadingWebhook {
  id: number;
  isLoading: true;
}

export interface LoadedWebhook {
  id: number;
  isLoading: false;
  webhook: Webhook;
}

export interface UnknownWebhook {
  id: number;
  isLoading: false;
  webhook: null;
}
