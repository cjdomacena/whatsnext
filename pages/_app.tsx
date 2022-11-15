import "../styles/globals.css";
import "@fontsource/montserrat";
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

export default function App({
  Component,
  pageProps,
  ...appProps
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  console.log();
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main>
        {appProps.router.pathname.split("/").includes("auth") ? null : (
          <Navbar />
        )}
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
