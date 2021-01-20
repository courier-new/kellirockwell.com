import { gql } from 'graphql-request';
import { QueryObserverResult, useQuery, UseQueryResult } from 'react-query';

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

type GetToolsResponse = {
  tools: {
    data: Tool[];
  };
};

/**
 * Query tools I use
 */
export const getTools = (): Promise<GetToolsResponse> =>
  request<GetToolsResponse>(
    'FAUNADB',
    gql`
      query {
        tools {
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
 * Hook to query the tools I use, which is cached indefinitely and not refreshed
 * throughout the duration of the time the user is on the site
 */
export const useTools = (): QueryObserverResult<GetToolsResponse, unknown> =>
  useQuery(TOOLS_CACHE_KEYS.getTools, getTools, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
