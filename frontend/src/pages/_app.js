import SidebarLayout from "@/components/ui/SidebarLayout";
import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {/* <SidebarLayout> */}
          <Component {...pageProps} />
        {/* </SidebarLayout> */}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
