import "../styles/globals.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Header/Navbar";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MetaHeader from "../lib/seo/MetaHeader";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({
  Component,
  pageProps,
  ...appProps
}: AppProps<{
  dehydratedState: unknown;
  initialSession: Session;
}>) {
  // Initialize supabase client
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {},
      })
  );
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MetaHeader title="What's Next" description="Awesome!!!" />
      <main className="">
        {appProps.router.pathname.split("/").includes("auth") ? null : (
          <Navbar />
        )}
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </main>
    </SessionContextProvider>
  );
}
