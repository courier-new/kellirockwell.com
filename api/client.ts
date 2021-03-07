import { GraphQLClient } from 'graphql-request';
import { Variables } from 'graphql-request/dist/types';

type ClientType = 'FAUNADB';
type ClientConfig = {
  /** The string API URL to direct requests to for this client */
  secret?: string;
  /** The secret client key to use to authorize these requests */
  url?: string;
};

/**
 * Retrieves the `ClientConfig` configuration (API URL and secret key/token) for
 * the provided `client` type
 *
 * @param client the API client type to get the configuration for
 */
const getClientConfig = (client: ClientType): ClientConfig => {
  switch (client) {
    case 'FAUNADB':
    default:
      return {
        secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
        url: process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
      };
  }
};

let instances: Partial<Record<ClientType, GraphQLClient>> = {};

/**
 * Creates a new `GraphQLClient` for a provided `client` type, or else returns
 * the existing instance of it
 *
 * @param client the API client type to create or retrieve
 */
const getClient = (client: ClientType) => {
  let instance = instances[client];

  if (!instance) {
    const { secret, url } = getClientConfig(client);

    if (!url || !secret) {
      // eslint-disable-next-line no-console
      console.error('[GRAPHQL CLIENT] Unable to make request: URL or secret missing.');
      return undefined;
    }

    instance = new GraphQLClient(url, {
      headers: { authorization: `Bearer ${secret}` },
    });

    instances = {
      ...instances,
      [client]: instance,
    };
  }
  return instance;
};

/**
 * Helper that delays the resolution of a promise chain
 *
 * @param milliseconds the amount to delay the resolution
 * @example delay(3000).then(() => console.log('Hello'));
 */
const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

type OptionsWithLogging<Options> = Options & {
  /** If true, the request will be logged */
  logRequest?: boolean;
};

/** Optional request parameters for testing or customizing a request */
type RequestOptions<ResponseSuccess, ResponseFail> =
  /** If set, an otherwise unaltered request will be logged */
  | { behavior: 'log' }
  | OptionsWithLogging<{
      behavior: 'fail';

      /** If provided, the request will fail with the given mockResponse */
      mockResponse?: ResponseFail;
      /**
       * If provided, the request will fail after `timeout` milliseconds. Bear
       * in mind that react-query will by default retry a request 3 additional
       * times, so a normal request will naturally take 4 x the `timeout`
       * duration specified to finally fail
       */
      timeout?: number;
    }>
  | OptionsWithLogging<{
      behavior: 'mock-succeed';
      mockResponse: ResponseSuccess;
    }>
  | OptionsWithLogging<{
      behavior: 'delay';
      /** Delays the request by `delay` milliseconds before running normally */
      delay: number;
      /** If provided, the request will succeed with the given mockResponse */
      mockResponse?: ResponseSuccess;
    }>;

/**
 * Wrapper of graphql-request's `request` that makes a request to the provided
 * `client` type with the provided `query`, `variable`, and any of various
 * `opts` available for testing
 *
 * @param client the API client type to make the request to
 * @param query the GraphQL query to make
 * @param variables (optional) the GraphQL query variables to send, as an object
 * @param opts (optional) any options for the request, such as forcing the
 * request to fail, or mocking the response, for testing purposes
 */
const request = async <ResponseSuccess = unknown, ResponseFail = unknown>(
  client: ClientType,
  query: string,
  variables?: Variables,
  opts?: RequestOptions<ResponseSuccess, ResponseFail>,
): Promise<ResponseSuccess> => {
  // Log by default in development
  const shouldLog =
    process.env.NODE_ENV === 'development' ||
    (opts ? opts.behavior === 'log' || opts.logRequest : false);

  if (shouldLog) {
    // eslint-disable-next-line no-console
    console.log('[GRAPHQL CLIENT] Sending new request', { query, variables });
  }

  if (opts?.behavior === 'fail') {
    return new Promise((_resolve, reject) =>
      setTimeout(
        () =>
          reject(
            opts.mockResponse ||
              'Congratulations! This request has automatically failed on account of the `timeout` request option being provided.',
          ),
        opts.timeout || 0,
      ),
    );
  }

  const mockResponse =
    opts?.behavior === 'mock-succeed' || opts?.behavior === 'delay'
      ? opts.mockResponse
      : undefined;

  await delay((opts?.behavior === 'delay' && opts.delay) || 0);
  const res = await (mockResponse
    ? Promise.resolve(mockResponse)
    : getClient(client)?.request(query, variables));
  if (shouldLog) {
    // eslint-disable-next-line no-console
    console.log('[GRAPHQL CLIENT] Response', res);
  }
  return Promise.resolve(res);
};

export default request;
