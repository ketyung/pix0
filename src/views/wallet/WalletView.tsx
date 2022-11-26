import { FC, useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { WalletListView } from "./WalletListView";
import { WalletIndView } from "./WalletIndView";
import { SelectedWalletStorage } from "../../utils/local-storage";
import useXrp from "../../hooks/useXrp";


export const WalletView : FC = () =>{

    const {genWallet} = useXrp();

    const [loading, setLoading] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState<string>();

    const genWalletNow = async () =>{

        setLoading(true);
        await genWallet();
        setLoading(false);
    }

    useEffect(()=>{
        setSelectedWallet(SelectedWalletStorage.getSelected());
    },[SelectedWalletStorage.getSelected()]);

    return <div className="m-auto p-10 mt-20 border-2 border-gray-200 rounded-3xl max-w-2xl text-center">
        
        <div><button className="bg-gray-200 hover:bg-gray-500 
        px-4 py-2 float-right mb-8 text-black  
        font-boiold rounded-full min-w-200" onClick={()=>{
            setSelectedWallet(undefined);
        }}>All wallets</button></div>

        {selectedWallet ? <WalletIndView pubkey={selectedWallet}/> : <WalletListView/> }
    
        <div>
        <button 
        onClick={async ()=>{

            await genWalletNow();
        }}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
        px-4 rounded-full min-w-200">
        {loading ? <Spinner/> : <>Create Wallet</>}
        </button>
        </div>

    </div>
}