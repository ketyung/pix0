import * as xrp from "../xrp";
import * as xrpl from 'xrpl';
import { uploadToArweave, uploadMetadata } from "../arweave";
import useWalletState from './useWalletState';
import { decryptStoredWallet } from "../utils/enc";
import { uriExists, urlToBase64, toClassicAddress } from "../utils";
import { StoredWallet, NFTResult, NFTMetadata } from "../models";
import { WalletsStorage } from "../utils/local-storage";
import { Offer } from "../models/token_offer";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import { Collection, CollectionMedia } from "../models/collection";
import { randomMediaForMinting, removeMintInfoOf } from "../service";


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

    const createNftOffer = async (tokenID : string,
        price : number, 
        destination? : string, 
        isSellOffer? : boolean,
        completion? : (res : { hash?: string, seq_num? : number, offer_id? : string }|Error)=> void)  =>{

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                if ( wallet ) {
                    await xrp.createNftOffer(tokenID,price, wallet,
                        destination,  isSellOffer, completion);
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


    const nftMetadataFrom = (media : CollectionMedia, collection : Collection) =>{

        let metadata : NFTMetadata = {name : `${media.name} of ${collection.name}`,
         description : collection.description};

        if ( media.medias.length > 0 ) {

            metadata.attributes = media.medias[0].attributes;
        }

        return metadata;
      
    }

    const randomMint = async (collection : Collection,
        completion? : (res : string|Error)=> void) => {

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);

                if ( wallet === undefined) {

                    if (completion)
                        completion(new Error('Failed to decrypt wallet'));
                    return;
                }

              
                if ( collection?._id) {
    
                    let collection_media : CollectionMedia|undefined =
                    await randomMediaForMinting(collection._id, selectedWalletPubkey);
                
                    if ( collection_media && collection_media.medias && 
                        collection_media.medias.length > 0 ) {
            
                        let media = collection_media.medias[0];
                        if ( media.value !== undefined) {
        
                            let data_url = await urlToBase64(media.value);
                            
                            // upload to arweave now ...
                            if ( typeof data_url === 'string') {
        
                                let uri = await uploadToArweave(data_url, media.content_type);

                                if ( uri instanceof Error){
                                    if ( completion)
                                        completion(uri);
                                    return; 
                                }
        
                                let metadata = nftMetadataFrom(collection_media, collection);
                                metadata.image = uri;
        
                                // upload metadata to arweave !
                                uri = await uploadMetadata(metadata);

                                
                                if ( uri instanceof Error){
                                    if ( completion)
                                        completion(uri);
                                    return; 
                                }
        
                                await xrp.mintNft(wallet, uri ,collection.std_price, 
                                    collection.transfer_fee,
                                    collection.burnable, async (e)=>{

                                        if ( e instanceof Error) {
                                            // if error, release the mint info
                                            // from the backend, so next person can mint
                                            await removeMintInfoOf(collection_media?._id ?? "", 
                                            selectedWalletPubkey);

                                        }
                                        if (completion)
                                            completion(e);
                               

                                });
        
        
                            }
                        }
                       
                    }
                    else {
            
                        if ( completion )
                            completion(new Error('No available media! Mint should have finished!'));
                    }
                }

            }
        }
    
       
      
    }
    
    const mintNft2 = async (
        params: {mediaURI? : string, 
        dataUrl? : string, 
        isDataUrl? : boolean,
        contentType? : string,
        metadata? : NFTMetadata, 
        fee? : number, 
        transferFee? : number, 
        isBurnable? : boolean }, 
        completion? : (res : string|Error)=> void) => {

        let treasuryFee = (params.fee ?? 1 ) * 0.99;
        let actualFee = (params.fee ?? 1) * 0.01;

        if (process.env.REACT_APP_TREASURY_WALLET ) {

            if ( toClassicAddress(selectedWalletPubkey ?? "") !== process.env.REACT_APP_TREASURY_WALLET) {

                await sendXrp(process.env.REACT_APP_TREASURY_WALLET, treasuryFee);
            }
        }

        params.fee = actualFee;
        
        await mintNft(params, completion);

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


    const acceptSellOffer = async (offer : Offer, completion? : (res : string|Error)=> void) =>{

        if ( selectedWalletPubkey ) {


            if ( offer.created_by.classic_address === toClassicAddress(selectedWalletPubkey) ) {
                if ( completion ) {
                    completion(new Error("You're the seller!"));
                }
                return;
            }

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                if ( wallet ) {
    
                    let amt = offer.price ?? 1;
                  
                    await xrp.acceptSellOffer( offer.offer_id ?? "", 
                        amt, wallet, completion);
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


    const sendXrp = async ( to : string, amount : number ,
        completion? : (res : { hash?: string } |Error)=> void ) => {

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
                if ( wallet ) {
                    await xrp.sendXrp(wallet, to, amount, completion);
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
        fundWallet,getBalance,mintNft, mintNft2, getNftSellOffers,getNftBuyOffers, 
        walletFromSeed, burnNft, createNftOffer, cancelOffer,
        acceptSellOffer,randomMint, sendXrp} as const;

}