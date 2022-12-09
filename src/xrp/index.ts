import * as xrpl from 'xrpl';
import { NFTOffer } from 'xrpl/dist/npm/models/common';
import { WalletsStorage } from '../utils/local-storage';
import { NFTResult} from '../models';
import { TxResponse, xrpToDrops } from 'xrpl';

export enum Network {

    TestNet,

    DevNet,
}


const defaultNet = Network.DevNet;

export const getNetwork = (network : Network = defaultNet) => {

    if ( network === Network.DevNet ) {

        return "wss://s.devnet.rippletest.net:51233";
    }

    return "wss://s.altnet.rippletest.net:51233";
}



export const getExplorerUrl = (network : Network = defaultNet) => {

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
    
       // client?.disconnect();

        return wallet;
    }
    catch(e : any) {

        console.error("error@genAndFundWallet", e, new Date());
        return undefined;
    }
}



export const genWallet = (storeWallet : boolean = true) =>{

    let wallet = xrpl.Wallet.generate();

    if (storeWallet) {
        WalletsStorage.add(wallet);
    }

    return wallet;
}


export const walletFromSeed = (seed : string, 
    completion? : (res: xrpl.Wallet|Error) =>void
    ,storeWallet : boolean = true ) =>{

    try {

        if ( seed.trim() === "" ){
            if (completion)
                completion(new Error("Empty seed!"));
            return;
        }

        let wallet = xrpl.Wallet.fromSeed(seed);

        if (storeWallet) {
            WalletsStorage.add(wallet);
        }
    
        if (completion)
            completion(wallet);
    }
    catch(e :any) {

        if (completion)
            completion(new Error(e.message));
    }
   
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

export const burnNft = async (
    wallet : xrpl.Wallet,
    tokenID : string, 
    completion? : (res : string|Error)=> void) => {

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

        const txb : xrpl.NFTokenBurn = {
            TransactionType: "NFTokenBurn",
            Account: wallet.classicAddress,
            NFTokenID: tokenID,
        };

        let signerWallet = xrpl.Wallet.fromSeed(wallet.seed ?? "");
       
        const tx = await client.submitAndWait(txb,{wallet: signerWallet});

        console.log("burn.tx:: ", tx, new Date());

        let res = tx.result.meta?.toString();

        if ( completion ){

            completion(res ?? "");
        }

    }
    catch ( e : any) {

        if ( completion ){

            completion(new Error(e.message));
        }

    }



}



export const mintNft = async (
    minterWallet : xrpl.Wallet,
    mediaURI : string, 
    fee? : number, 
    transferFee? : number,
    isBurnable? : boolean,
    completion? : (res : string|Error)=> void) => {

    try {
        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

        let nftMint : xrpl.NFTokenMint = {

            Account : minterWallet.classicAddress,

            NFTokenTaxon : 0, 

            URI : xrpl.convertStringToHex(mediaURI),

            TransactionType : "NFTokenMint",

            TransferFee : transferFee ?? 0 ,

            Fee : fee ? xrpl.xrpToDrops(`${fee}`) : undefined,

            Flags : isBurnable ? (1 + 8) : 8 // (1+8 = burnable & transferrable) else transferrable only

        };

        const nft_tx_prepared = await client.autofill(nftMint);
       
        let signerWallet = xrpl.Wallet.fromSeed(minterWallet.seed ?? "");
       
        const nft_signed = signerWallet.sign(nft_tx_prepared);

        const nft_result = await client.submitAndWait(nft_signed.tx_blob);

        if (nft_result.result.meta !== undefined && 
            !(typeof nft_result.result.meta === 'string' 
            || nft_result.result.meta instanceof String)) {

            if (nft_result.result.meta.TransactionResult === "tesSUCCESS") {
                
                client?.disconnect();
                if ( completion ) {

                    completion(nft_signed.hash);
                }
                //console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${nft_signed.hash}`)
            } 
            else {
                
                client?.disconnect();
             
                if ( completion ) {
                    completion(new Error(`Error sending transaction: ${nft_result}`));
                }
            }
        }
    }
    catch(e : any ){

        if (completion )
            completion(new Error(`${e.message}` ));

       // console.error("error@minNft:",e.message, e.data, new Date());
    }
    
}


export const getNftsOf = async ( 
    wallet : xrpl.Wallet, 
    id : number, 
    offset : number = 0, 
    limit :number = 20) : Promise<NFTResult>=> {

    let net = getNetwork();

    const client = new xrpl.Client(net);

    await client.connect();

    let req : xrpl.AccountNFTsRequest = {
        account : wallet.classicAddress,
        limit : limit,
        marker : `${offset}`,
        command: "account_nfts",
        id : id, 
    };

    let resp = await client.request(req);
    
    let res : NFTResult = {

        nfts : resp.result.account_nfts,
        offset : offset,
        limit : limit,
        id : resp.id, 
    }

    client?.disconnect();
    
    return res; 

}

export const sendXrp = async ( from : xrpl.Wallet, to : string,
    amount : number ,
    completion? : (res : { hash?: string } |Error)=> void ) =>{
    
    try {

        let net = getNetwork();
        
        const client = new xrpl.Client(net);

        await client.connect();

        const prepared = await client.autofill({
            "TransactionType": "Payment",
            "Account": from.address,
            "Amount": xrpl.xrpToDrops(amount),
            "Destination": to
        });

        let signerWallet = xrpl.Wallet.fromSeed(from.seed ?? "");
            
        const signed = signerWallet.sign(prepared)
        
        const tx = await client.submitAndWait(signed.tx_blob);

        client?.disconnect();
 
        if ( completion) {
            completion({hash : tx.result.hash });
        }
    }
    catch (e : any) {

        if ( completion)
            completion(new Error(e.message));
    }

}


export const getTx = async ( id : string) : Promise<TxResponse>=> {

    let net = getNetwork();

    const client = new xrpl.Client(net);

    await client.connect();

    let req : xrpl.TxRequest = {
        command :"tx",
        transaction : id, 
    };

    let resp = await client.request(req);
   
    client?.disconnect();
    
    return resp; 

}


export const createNftOffer = async (tokenId : string, price: number,
    sellerWallet : xrpl.Wallet,
    completion? : (res : { hash?: string, seq_num? : number} |Error)=> void) =>{

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);
    
        await client.connect();
        
        let transactionBlob : xrpl.NFTokenCreateOffer =  {
            TransactionType: "NFTokenCreateOffer",
            Account: sellerWallet.classicAddress ,
            NFTokenID: tokenId,
            Amount : xrpl.xrpToDrops(`${price}`),
            Flags: 1,
        };
    
        let signerWallet = xrpl.Wallet.fromSeed(sellerWallet.seed ?? "");
       
        // submit tx
        const tx = await client.submitAndWait(transactionBlob,{wallet: signerWallet});
        client?.disconnect();
 
        if ( completion) {
            completion({hash : tx.result.hash, seq_num: tx.result.Sequence});
        }
    }
    catch( e : any ) {

        if ( completion)
            completion(new Error(e.message));
    }
   
}


export const cancelOffer = async (offerId : string,
    wallet : xrpl.Wallet,
    completion? : (res : string|Error)=> void) =>{

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);
    
        await client.connect();
        
        let transactionBlob : xrpl.NFTokenCancelOffer =  {
            TransactionType: "NFTokenCancelOffer",
            Account: wallet.classicAddress ,
            NFTokenOffers: [offerId],
        };
    
        let signerWallet = xrpl.Wallet.fromSeed(wallet.seed ?? "");
       
        // submit tx
        const tx = await client.submitAndWait(transactionBlob,{wallet: signerWallet});
        
        if ( completion) {
            completion(tx.result.hash);
        }
    }
    catch( e : any ) {

        if ( completion)
            completion(new Error(e.message));
    }
   
}
// refer here
// https://js.xrpl.org/interfaces/NFTokenAcceptOffer.html#TicketSequence
export const acceptSellOffer = async (offerId : string,
    fee : number, wallet : xrpl.Wallet, completion? : (res : string|Error)=> void) =>{

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);
    
        await client.connect();
        
        let transactionBlob : xrpl.NFTokenAcceptOffer =  {
            TransactionType: "NFTokenAcceptOffer",
            Account: wallet.classicAddress ,
            NFTokenSellOffer: "sell_offer", 
            AccountTxnID : offerId,
            Fee : xrpToDrops(fee), 
        };
    
        let signerWallet = xrpl.Wallet.fromSeed(wallet.seed ?? "");
       
        // submit tx
        const tx = await client.submitAndWait(transactionBlob,{wallet: signerWallet});
        
        if ( completion) {
            completion(tx.result.hash);
        }
    }
    catch( e : any ) {

        if ( completion)
            completion(new Error(e.message));
    }
   
}


export const getNftSellOffers = async ( 
    wallet : xrpl.Wallet, 
    tokenId : string, id? : string  ) : Promise<NFTOffer[]>=> {


    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

        let req : xrpl.NFTSellOffersRequest = {
            account : wallet.classicAddress,
            nft_id : tokenId, 
            command: "nft_sell_offers",
            id : id, 
        };

        let resp = await client.request(req);
        
        client?.disconnect();
        return resp.result.offers; 
    }
    catch ( e : any ){

        //console.log("e:xx@sOffers",e );
        return [];
    }
}

export const getNftBuyOffers = async ( 
    wallet : xrpl.Wallet, 
    tokenId : string, id? : string  ) : Promise<NFTOffer[]>=> {

    try {

        let net = getNetwork();

        const client = new xrpl.Client(net);

        await client.connect();

        let req : xrpl.NFTBuyOffersRequest = {
            account : wallet.classicAddress,
            nft_id : tokenId, 
            command: "nft_buy_offers",
            id : id, 
        };

        let resp = await client.request(req);
        
        client?.disconnect();
        return resp.result.offers; 

    }
    catch ( e : any ){

        //console.log("e:xx@bOffers",e );
        return [];
    }    
}

