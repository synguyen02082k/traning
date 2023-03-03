import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GetAllUser = {
  __typename?: "GetAllUser";
  page?: Maybe<Scalars["Int"]>;
  perPage?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  totalPage?: Maybe<Scalars["Int"]>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type GetAllUserInput = {
  page?: InputMaybe<Scalars["Int"]>;
  perPage?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Search>;
};

export type Query = {
  __typename?: "Query";
  GetAllUser?: Maybe<GetAllUser>;
};

export type QueryGetAllUserArgs = {
  input: GetAllUserInput;
};

export type Search = {
  keyword?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  active?: Maybe<Scalars["Boolean"]>;
  age?: Maybe<Scalars["Int"]>;
  fullName?: Maybe<Scalars["String"]>;
};

export type GetAllUserQueryVariables = Exact<{
  input: GetAllUserInput;
}>;

export type GetAllUserQuery = {
  __typename?: "Query";
  GetAllUser?: {
    __typename?: "GetAllUser";
    page?: number | null;
    perPage?: number | null;
    totalPage?: number | null;
    totalCount?: number | null;
    users?: Array<{
      __typename?: "User";
      fullName?: string | null;
      age?: number | null;
      active?: boolean | null;
    } | null> | null;
  } | null;
};

export const GetAllUserDocument = gql`
  query GetAllUser($input: GetAllUserInput!) {
    GetAllUser(input: $input)
      @rest(type: "GetAllUser", path: "/users?{args.input}", method: "GET") {
      users {
        fullName
        age
        active
      }
      page
      perPage
      totalPage
      totalCount
    }
  }
`;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(
    GetAllUserDocument,
    options
  );
}
export function useGetAllUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUserQuery, GetAllUserQueryVariables>(
    GetAllUserDocument,
    options
  );
}
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<
  typeof useGetAllUserLazyQuery
>;
export type GetAllUserQueryResult = Apollo.QueryResult<
  GetAllUserQuery,
  GetAllUserQueryVariables
>;
