import * as xrp from "../xrp";
import * as xrpl from 'xrpl';

export default function useXrp() {

    const genAndFundWallet = async () : Promise<{ wallet : xrpl.Wallet, balance : number}> =>{
  
        let w = await xrp.genAndFundWallet();
        return w;
    }

    return {genAndFundWallet} as const;

}