import Layout from "../src/components/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="Ln95OTXfWjIYSCFyPd9hXlzJsKUP6H5GnhTBiCHa"
      serverUrl="https://zpoco9zecvth.usemoralis.com:2053/server"
    >
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;
