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
  JSON: any;
};

export type CreateUser = {
  __typename?: "CreateUser";
  user?: Maybe<Scalars["JSON"]>;
};

export type CreateUserInput = {
  DOB?: InputMaybe<Scalars["String"]>;
  active?: InputMaybe<Scalars["Boolean"]>;
  division?: InputMaybe<Scalars["String"]>;
  fullName?: InputMaybe<Scalars["String"]>;
};

export type DeleteUser = {
  __typename?: "DeleteUser";
  user?: Maybe<Scalars["JSON"]>;
};

export type DeleteUserInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type DeleteUsers = {
  __typename?: "DeleteUsers";
  success?: Maybe<Scalars["JSON"]>;
};

export type DeleteUsersInput = {
  ids?: InputMaybe<Scalars["String"]>;
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
  sort?: InputMaybe<Scalars["JSON"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  CreateUser?: Maybe<CreateUser>;
  DeleteUser?: Maybe<DeleteUser>;
  DeleteUsers?: Maybe<DeleteUsers>;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationDeleteUsersArgs = {
  input: DeleteUsersInput;
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
  _id?: Maybe<Scalars["String"]>;
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
      _id?: string | null;
    } | null> | null;
  } | null;
};

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  DeleteUser?: { __typename?: "DeleteUser"; user?: any | null } | null;
};

export type DeleteUsersMutationVariables = Exact<{
  input: DeleteUsersInput;
}>;

export type DeleteUsersMutation = {
  __typename?: "Mutation";
  DeleteUsers?: { __typename?: "DeleteUsers"; success?: any | null } | null;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  CreateUser?: { __typename?: "CreateUser"; user?: any | null } | null;
};

export const GetAllUserDocument = gql`
  query GetAllUser($input: GetAllUserInput!) {
    GetAllUser(input: $input)
      @rest(type: "GetAllUser", path: "/users?{args.input}", method: "GET") {
      users {
        fullName
        age
        active
        _id
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
export const DeleteUserDocument = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    DeleteUser(input: $input)
      @rest(
        type: "DeleteUser"
        path: "/user/{args.input.id}"
        method: "Delete"
      ) {
      user
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const DeleteUsersDocument = gql`
  mutation DeleteUsers($input: DeleteUsersInput!) {
    DeleteUsers(input: $input)
      @rest(
        type: "DeleteUsers"
        path: "/users/{args.input.ids}"
        method: "Delete"
      ) {
      success
    }
  }
`;
export type DeleteUsersMutationFn = Apollo.MutationFunction<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
>;

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUsersMutation,
    DeleteUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(
    DeleteUsersDocument,
    options
  );
}
export type DeleteUsersMutationHookResult = ReturnType<
  typeof useDeleteUsersMutation
>;
export type DeleteUsersMutationResult =
  Apollo.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<
  DeleteUsersMutation,
  DeleteUsersMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input)
      @rest(type: "CreateUser", path: "/users", method: "Post") {
      user
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
