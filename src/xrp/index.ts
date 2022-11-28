import * as xrpl from 'xrpl';
import { WalletsStorage } from '../utils/local-storage';

export enum Network {

    TestNet,

    DevNet,
}


export const getNetwork = (network : Network = Network.DevNet) => {

    if ( network === Network.DevNet ) {

        return "wss://s.devnet.rippletest.net:51233";
    }

    return "wss://s.altnet.rippletest.net:51233";
}


export const getExplorerUrl = (network : Network = Network.DevNet) => {

    if ( network === Network.DevNet ) {

        return "https://devnet.xrpl.org/";
    }

    return "https://testnet.xrpl.org/";
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
    
       // await client.disconnect();

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

       let address = wallet.classicAddress;

       
       const response = await client.request({
            "command": "account_info",
            "account": address,
            "ledger_index": "validated"
        });
       
        balance = (parseFloat(response.result.account_data.Balance) / 1000_000).toFixed(2);

    }
    catch(e: any){
        console.error("getBalance::@error",e, new Date());
    }

    return balance;
    
}


// refer here 
// https://js.xrpl.org/interfaces/NFTokenMint.html
export const mintNft = async (
    minterWallet : xrpl.Wallet,
    mediaURI : string, 
    fee? : number, 
    transferFee? : number, 
    completion? : (res : string|Error)=> void) => {

    try {
        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

        let nftMint : xrpl.NFTokenMint = {

            Account : minterWallet.classicAddress,

            NFTokenTaxon : 0, 

            URI : mediaURI,

            TransactionType : "NFTokenMint",

            TransferFee : transferFee ,

            Fee : fee ? `${fee}` : undefined,

        };

        const nft_tx_prepared = await client.autofill(nftMint);
        const nft_signed = minterWallet.sign(nft_tx_prepared);

        const nft_result = await client.submitAndWait(nft_signed.tx_blob);

        if (nft_result.result.meta !== undefined && 
            !(typeof nft_result.result.meta === 'string' 
            || nft_result.result.meta instanceof String)) {

            if (nft_result.result.meta.TransactionResult == "tesSUCCESS") {
                
                if ( completion ) {

                    completion(nft_signed.hash);
                }
                //console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${nft_signed.hash}`)
            } 
            else {
                
                if ( completion ) {
                    completion(new Error(`Error sending transaction: ${nft_result}`));
                }
            }
        }
    }
    catch(e : any ){

        if (completion )
            completion(new Error(e.message));
    }
    
}