export const getAllUser = /*GraphQL*/ `
query GetAllUser($input: GetAllUserInput!) {
    GetAllUser(input: $input) 
    @rest(
        type: "GetAllUser", 
        path: "/users?{args.input}",
        method: "GET"
    ) {
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

export const deleteUser = /*GraphQL*/ `
mutation DeleteUser($input: DeleteUserInput!) {
    DeleteUser(input: $input) 
    @rest(
        type: "DeleteUser", 
        path: "/user/{args.input.id}",
        method: "Delete"
    ){
        user
    }
  }
`;

export const deleteUsers = /*GraphQL*/ `
mutation DeleteUsers($input: DeleteUsersInput!) {
    DeleteUsers(input: $input) 
    @rest(
        type: "DeleteUsers", 
        path: "/users/{args.input.ids}",
        method: "Delete"
    ){
        success
    }
  }
`;
