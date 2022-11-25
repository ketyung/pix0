import { FC, useState } from "react";
import * as xrpl from 'xrpl';
import { Spinner } from "../components/Spinner";
import useXrp from "../../hooks/useXrp";


export const WalletView : FC = () =>{

    const {genAndFundWallet} = useXrp();

    const [wallet, setWallet] = useState<{wallet : xrpl.Wallet, balance : number}>();

    const [loading, setLoading] = useState(false);

    const genWalletNow = async () =>{

        setLoading(true);

        let w = await genAndFundWallet();

        setWallet(w);

        setLoading(false);
    }

    return <div className="flex items-center">

        {wallet && 
        <div>
            <div className="items-left">
            Public Key : {wallet?.wallet.publicKey}
            </div>

            <div className="items-left">
            Seed Phrase : {wallet?.wallet.seed}
            </div>

            <div className="items-left">
            Balance : {wallet?.balance}
            </div>
        </div>}
      

        <button 
        onClick={async ()=>{

            await genWalletNow();
        }}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {loading ? <Spinner/> : <>Generate Wallet</>}
        </button>

    </div>
}