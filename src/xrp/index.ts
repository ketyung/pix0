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
    
        await client.disconnect();

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

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);
    
        await client.connect();
        
        let _wallet = await client.fundWallet(wallet);
        
        return _wallet;
    }
    catch(e : any) {

        console.error("fundWallet::@error",e, new Date());
  
    }
}


export const getBalance = async ( wallet : xrpl.Wallet) =>{

    let balance : string = "0";

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

       // console.log("get.bal::", wallet.address, wallet.publicKey, wallet.seed);

        const response = await client.request({
            "command": "account_info",
            "account": wallet.address,
            "ledger_index": "validated"
        });

    
        console.log("resp@@X", response, wallet, new Date());
    
        balance = response.result.account_data.Balance;

        await client.disconnect();
        
    }
    catch(e: any){
        console.error("getBalance::@error",e, new Date());
    }

    return balance;
    
}