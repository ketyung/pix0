import * as xrp from "../xrp";
import * as xrpl from 'xrpl';

export default function useXrp() {

    const genAndFundWallet = async () : Promise<{ wallet : xrpl.Wallet, balance : number}|undefined> =>{
  
        let w = await xrp.genAndFundWallet();
        return w;
    }

    const genWallet = async () : Promise <xrpl.Wallet|undefined> =>{

        let w = await xrp.genWallet();
        return w;
    } 



    return {genAndFundWallet,genWallet} as const;

}