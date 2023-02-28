import App from "../App";
import ApolloProvider from "./ApolloProvider";

const AppProvider = () => {
  return (
    <ApolloProvider>
      <App />
    </ApolloProvider>
  );
};

export default AppProvider;
