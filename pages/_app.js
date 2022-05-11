import Layout from "../src/components/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';


const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
}


function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer/>
      </Layout>
    </Web3ReactProvider>
  );
}

export default MyApp;
