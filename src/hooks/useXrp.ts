import * as xrp from "../xrp";
import * as xrpl from 'xrpl';
import { decryptStoredWallet } from "../utils/enc";
import { StoredWallet } from "../models";

export default function useXrp() {

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
        await xrp.fundWallet(w);
    }


    return {genAndFundWallet,genWallet, fundWallet} as const;

}