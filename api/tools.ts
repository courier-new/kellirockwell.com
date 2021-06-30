import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';

import request from './client';

/** Type of a tool in my toolbox */
export type Tool = {
  /** Unique identifier */
  _id: string;
  /**
   * A list of ways a tool can be highlighted; "hearted" indicates a tool I
   * really enjoy and "starred" indicates a tool I have a lot of experience using
   */
  marks?: ('HEARTED' | 'STARRED' | 'LEARNING')[];
  /** The display name for the tool */
  name: string;
};

export const TOOLS_CACHE_KEYS = {
  getTools: '@tools/get-tools',
};

/** Response type of getTools query */
export type GetToolsResponse = {
  /** Page of tools */
  tools: {
    /** The tools themselves */
    data: Tool[];
  };
};

/** Query tools I use */
export const getTools = (): Promise<GetToolsResponse> =>
  request<GetToolsResponse>(
    'FAUNADB',
    gql`
      query {
        tools(_size: 100) {
          data {
            _id
            name
            marks
          }
        }
      }
    `,
  );

/**
 * Hook to query the tools I use, which is cached for 24 hours
 *
 * @param options (optional) any `UseQueryOptions` to apply to this query
 */
export const useTools = (
  options?: UseQueryOptions<GetToolsResponse>,
): QueryObserverResult<GetToolsResponse, unknown> =>
  useQuery(TOOLS_CACHE_KEYS.getTools, getTools, {
    cacheTime: 1000 * 60 * 60 * 24,
    // an hour
    staleTime: 1000 * 60 * 60,
    ...options,
  });
