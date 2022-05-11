import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 80001]
});




export const connectors = { injected: injected };