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
        }
        page
        perPage
        totalPage
    }
  }
`;
