import * as xrpl from 'xrpl';
import { WalletsStorage } from '../utils/local-storage';

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



export const genAndFundWallet = async (storeWallet : boolean = true) =>{

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);
    
        await client.connect();
        
        let wallet = await client.fundWallet();
    
        if (storeWallet) {
    
            WalletsStorage.add(wallet.wallet);
        }
    
        return wallet;
    }
    catch(e : any) {

        console.error("error@genAndFundWallet", e, new Date());
        return undefined;
    }
}



export const genWallet = async (storeWallet : boolean = true) =>{

    let wallet = xrpl.Wallet.generate();

    if (storeWallet) {
        WalletsStorage.add(wallet);
    }

    return wallet;
}


export const fundWallet = async (wallet? : xrpl.Wallet) =>{

    let net = getNetwork();

    const client = new xrpl.Client(net);

    await client.connect();
    
    let _wallet = await client.fundWallet(wallet);

    return _wallet;
}