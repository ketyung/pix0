import * as xrpl from 'xrpl';

export enum Network {

    TestNet,

    DevNet,
}


export const getNetwork = (network : Network = Network.TestNet) => {

    if ( network === Network.DevNet ) {

        return "wss://s.devnet.rippletest.net:51233";
    }

    return "wss://s.altnet.rippletest.net:51233";
}



export const genAndFundWallet = async () =>{

    let net = getNetwork();

    const client = new xrpl.Client(net);

    await client.connect();
    
    let wallet = await client.fundWallet();

    return wallet;
}



export const genWallet = async () =>{

    let wallet = xrpl.Wallet.generate();

    return wallet;
}


export const fundWallet = async (wallet? : xrpl.Wallet) =>{

    let net = getNetwork();

    const client = new xrpl.Client(net);

    await client.connect();
    
    let _wallet = await client.fundWallet(wallet);

    return _wallet;
}