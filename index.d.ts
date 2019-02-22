import React, { StatelessComponent, ComponentClass, ClassicComponentClass } from "react";

type MutationSubscription = {
  when: string | RegExp;
  run: (payload: MutationHandlerPayload, resp: object, variables: object) => any;
};

type MutationHandlerPayload = {
  currentResults: object;
  cache: Cache;
  softReset: () => void;
  hardReset: () => void;
  refresh: () => void;
};

type QueryPacket = [string, any, any];
type MutationPacket = [string, any];

export type QueryProps = {
  loading: boolean;
  loaded: boolean;
  data: object;
  error: any;
  reload: () => void;
  clearCache: () => void;
  clearCacheAndReload: () => void;
};

//props that are passed to your decorated mutation component
export type MutationProps = {
  running: boolean;
  finished: boolean;
  runMutation: (variables: object) => void;
};

export class Cache {
  constructor(cacheSize?: number);
  entries: [string, any][];
  get(key): any;
  set(key, results): void;
  delete(key): void;
  clearCache(): void;
}

export class Client {
  constructor(options: { endpoint: string; noCaching?: boolean; cacheSize?: number; fetchOptions?: object });
  runQuery(query: string, variables?: object): Promise<any>;
  getGraphqlQuery({ query: string, variables: object }): string;
  processMutation(mutation: string, variables?: object): Promise<any>;
  runMutation(mutation: string, variables?: object): Promise<any>;
  getCache(query: string): Cache;
  newCacheForQuery(query: string): Cache;
  setCache(query: string, cache: Cache): void;
  subscribeMutation(subscription, options?): () => void;
  forceUpdate(query): void;
}

type BuildQueryOptions = {
  onMutation?: MutationSubscription | MutationSubscription[];
  client?: Client;
  cache?: Cache;
};

type BuildMutationOptions = {
  client?: Client;
};

export const buildQuery: (queryText: string, variables?: object, options?: BuildQueryOptions) => QueryPacket;
export const buildMutation: (mutationText: string, options?: BuildQueryOptions) => MutationPacket;

type IReactComponent<P = any> = StatelessComponent<P> | ComponentClass<P> | ClassicComponentClass<P>;

export const compress: any;
export const setDefaultClient: (client: Client) => void;
export const getDefaultClient: () => Client;

//options you can pass to the mutation decorator
export interface MutationOptions {
  client?: Client;
  mapProps?: (props: object) => object;
}

//options you can pass to the query decorator
export interface QueryOptions {
  client?: Client;
  cache?: Cache;
  mapProps?: (props: object) => object;
  onMutation?: MutationSubscription | MutationSubscription[];
}

//query hook
export function useQuery(queryPacket: any): any;

//mutation hook
export function useMutation(mutation: any): any;

export class GraphQL extends React.Component<{ query?: any; mutation?: any }, any> {}
