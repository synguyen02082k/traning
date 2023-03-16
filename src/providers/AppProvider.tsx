import App from "../App";
import ApolloProvider from "./ApolloProvider";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider>
        <App />
        <ToastContainer />
      </ApolloProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
