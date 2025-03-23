import { createRoot } from "react-dom/client";
import { App } from "./app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to.");
}

const queryClient = new QueryClient();
// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,

  // <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
  //   <App />
  // </PersistQueryClientProvider>,
);
