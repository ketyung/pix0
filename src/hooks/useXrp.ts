import * as xrp from "../xrp";
import * as xrpl from 'xrpl';
import useWalletState from './useWalletState';
import { decryptStoredWallet } from "../utils/enc";
import { StoredWallet, NFTResult } from "../models";
import { WalletsStorage } from "../utils/local-storage";

export default function useXrp() {

    const {selectedWalletPubkey} = useWalletState();

    const genAndFundWallet = async () : Promise<{ wallet : xrpl.Wallet, balance : number}|undefined> =>{
  
        let w = await xrp.genAndFundWallet();
        return w;
    }

    const genWallet = async () : Promise <xrpl.Wallet|undefined> =>{

        let w = await xrp.genWallet();
        return w;
    } 


    const fundWallet = async (storedWallet : StoredWallet) =>{

        let w = decryptStoredWallet(storedWallet);
        return await xrp.fundWallet(w);
    }

    const getBalance = async (storedWallet : StoredWallet) =>{
     
        let w = decryptStoredWallet(storedWallet);
        return await xrp.getBalance(w);
    }

    const mintNft = async (
        mediaURI : string, 
        fee? : number, 
        transferFee? : number, 
        isBurnable? : boolean,
        completion? : (res : string|Error)=> void) => {

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
      
                await xrp.mintNft(wallet, mediaURI,fee, transferFee,
                    isBurnable,completion);
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
                
                let res = await xrp.getNftsOf(wallet, id, offset, limit);

                return res;
            }
        }

        return undefined;
    }


    return {genAndFundWallet,genWallet,getNftsOf,  
        fundWallet,getBalance,mintNft} as const;

}