import "../styles/globals.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Header/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
