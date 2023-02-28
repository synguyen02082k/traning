import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { RestLink } from "apollo-link-rest";
import { PropsWithChildren } from "react";

const restLink = new RestLink({
  uri: "http://localhost:8080/api/v1/",
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const AppApolloProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
