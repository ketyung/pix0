import * as xrp from "../xrp";
import * as xrpl from 'xrpl';
import useWalletState from './useWalletState';
import { decryptStoredWallet } from "../utils/enc";
import { StoredWallet } from "../models";
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
        completion? : (res : string|Error)=> void) => {

        if ( selectedWalletPubkey ) {

            let connectedWallet = WalletsStorage.get(selectedWalletPubkey);
            if ( connectedWallet) {

                let wallet = decryptStoredWallet(connectedWallet);
      
                await xrp.mintNft(wallet, mediaURI,fee, transferFee, completion);
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


    return {genAndFundWallet,genWallet, 
        fundWallet,getBalance,mintNft} as const;

}