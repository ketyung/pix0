import * as xrp from "../xrp";
import * as xrpl from 'xrpl';
import { NFTOffer } from "xrpl/dist/npm/models/common";
import { uploadToArweave, uploadMetadata } from "../arweave";
import useWalletState from './useWalletState';
import { decryptStoredWallet } from "../utils/enc";
import { uriExists } from "../utils";
import { StoredWallet, NFTResult, NFTMetadata } from "../models";
import { WalletsStorage } from "../utils/local-storage";


export default function useXrp() {

    const {selectedWalletPubkey} = useWalletState();

    const genWallet = () : xrpl.Wallet =>{

        let w = xrp.genWallet();
        return w;
    } 

    const walletFromSeed = (seed : string,
        completion? : (res: xrpl.Wallet|Error) =>void) => {

        xrp.walletFromSeed(seed, completion);
    }


    const fundWallet = async (storedWallet : StoredWallet) =>{

        let w = decryptStoredWallet(storedWallet);
        return await xrp.fundWallet(w);
    }

    const getBalance = async (storedWallet : StoredWallet) =>{
     
        let w = decryptStoredWallet(storedWallet);
        if ( w )
            return await xrp.getBalance(w);
    }

    const burnNft = async (tokenID : string,
        completion? : (res : string|Error)=> void)  =>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                if ( wallet ) {

                    await xrp.burnNft(wallet, tokenID,completion);
                }
                else {
                    if ( completion ) {
                        completion(new Error("Undefined wallet!"));
                    }
    
                }
            }
        }
        else {

            if ( completion ) {

                completion(new Error("No connected wallet!"));
            }
        }
       
    }

    const createNftSellOffer = async (tokenID : string,
        price : number, 
        completion? : (res : { hash?: string, seq_num? : number}|Error)=> void)  =>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                if ( wallet ) {
                    await xrp.createNftSellOffer(tokenID,price, wallet, completion);
                }
                else {
                    if ( completion ) {
                        completion(new Error("Undefined wallet!"));
                    }
    
                }
            }
        }
        else {

            if ( completion ) {

                completion(new Error("No connected wallet!"));
            }
        }
       
    }

    const cancelOffer = async (offerId : string, 
        completion? : (res : string|Error)=> void)  =>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                if ( wallet ) {
                    await xrp.cancelOffer(offerId, wallet, completion);
                }
                else {
                    if ( completion ) {
                        completion(new Error("Undefined wallet!"));
                    }
    
                }
            }
        }
        else {

            if ( completion ) {

                completion(new Error("No connected wallet!"));
            }
        }
       
    }


    const mintNft = async (
        params: {mediaURI? : string, 
        dataUrl? : string, 
        isDataUrl? : boolean,
        contentType? : string,
        metadata? : NFTMetadata, 
        fee? : number, 
        transferFee? : number, 
        isBurnable? : boolean }, 
        completion? : (res : string|Error)=> void) => {

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                let uri : string|Error = params.mediaURI ?? "";
              
                if ( params.isDataUrl ) {

                    if ( params.dataUrl === undefined || params.dataUrl.trim() === "" ){

                        if ( completion)
                            completion( new Error('Invalid data url!!'));
                        return;
                    }
                    
                    uri = await uploadToArweave(params.dataUrl, params.contentType);
                    if ( uri instanceof Error){
                        if ( completion)
                            completion(uri);
                        return; 
                    }
                }
                else {

                    // check the validity of the uri
                    if ( uri.trim() === "" || !(await uriExists(uri))) {
                        if ( completion) {

                            completion( new Error(`URL ${uri} isn't valid!`));
                            return; 
                        }
                    }
                }

                if (params.metadata ){

                    let m = params.metadata;
                    m.image = uri;
                    uri = await uploadMetadata(m);

                    if ( uri instanceof Error){
                        if ( completion)
                            completion(uri);
                        return; 
                    }
                }
      
                if ( wallet ) {

                    await xrp.mintNft(wallet, uri ,params.fee, 
                        params.transferFee,
                        params.isBurnable,completion);
                }
                else {
                    if ( completion ) {
                        completion(new Error("Undefined wallet!"));
                    }
    
                }
            }
            else {

                if ( completion ) {
                    completion(new Error("No connected wallet!"));
                }
            }
        }
        else {

            if ( completion ) {

                completion(new Error("No connected wallet!"));
            }
        }
       
      
    }

    const getNftsOf = async (
        offset : number = 0, 
        limit :number = 20,
        id : number = 1) : 
        Promise<NFTResult|undefined>=> {


        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                
                if ( wallet ) {
                    let res = await xrp.getNftsOf(wallet, id, offset, limit);

                    return res;
              
                }

                return undefined;
            }
        }

    }

    const getNftSellOffers = async ( 
        tokenId : string, id? : string  ) : Promise<NFTOffer[]|undefined>=>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                if ( wallet ) {

                    let offers = await xrp.getNftSellOffers(wallet, tokenId, id);
                    return offers;
                }

            }
        }
        return undefined;
    }

    const getNftBuyOffers = async ( 
        tokenId : string, id? : string  ) : Promise<NFTOffer[]|undefined>=>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                if ( wallet ) {

                    let offers = await xrp.getNftBuyOffers(wallet, tokenId, id);
                    return offers;
                }

            }
        }
        return undefined;
    }


    const acceptSellOffer = async (offerId : string,
        fee : number, completion? : (res : string|Error)=> void) =>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                if ( wallet ) {

                    await xrp.acceptSellOffer(offerId, fee, wallet, completion);
                }
                else {
                    if ( completion ) {
                        completion(new Error("Undefined wallet!"));
                    }
    
                }

            }
        }
        else {

            if ( completion ) {
                completion(new Error("No connected wallet!"));
            }
        }

    }



    return {genWallet,getNftsOf,  
        fundWallet,getBalance,mintNft, getNftSellOffers,getNftBuyOffers, 
        walletFromSeed, burnNft, createNftSellOffer, cancelOffer,
        acceptSellOffer} as const;

}