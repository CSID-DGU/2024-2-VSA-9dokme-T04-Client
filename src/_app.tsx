import "../app/globals.css"; // globals.css 경로를 확인하고 정확히 import
import type { AppProps } from "next/app";
import "index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
