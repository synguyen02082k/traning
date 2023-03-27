import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { RestLink } from "apollo-link-rest";
import { PropsWithChildren } from "react";
import { BASE_URL } from "../constants/constant";
import { setContext } from "@apollo/client/link/context";

const restLink = new RestLink({
  uri: BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(restLink),
});

const AppApolloProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
