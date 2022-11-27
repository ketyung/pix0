import { FC, useState } from "react";
import { Spinner } from "../components/Spinner";
import { WalletListView } from "./WalletListView";
import { WalletIndView } from "./WalletIndView";
import useWalletState from "../../hooks/useWalletState";
import { CloseIcon } from "../components/icons/CloseIcon";
import useXrp from "../../hooks/useXrp";

export enum ViewType {

    AllWallets,

    IndWallet, 
}


export const View : FC = () =>{

    const {genWallet} = useXrp();

    const [loading, setLoading] = useState(false);

    const [viewType, setViewType] = useState<ViewType>(ViewType.IndWallet);

    const {selectedWalletPubkey, walletsCount} = useWalletState();

    const genWalletNow = async () =>{

        setLoading(true);
        await genWallet();
        setLoading(false);
    }

   
    return <div className="m-auto p-10 mt-20 border-2 border-gray-200 rounded-3xl w-5/6 text-center">
        
        <div className="text-right">
        {viewType === ViewType.AllWallets && 
        <button className="mr-10" onClick={()=>{
            setViewType(ViewType.IndWallet);
        }}><CloseIcon textColorClass="text-gray-400"/></button>}

        <button className="bg-gray-200 hover:bg-gray-500 
        px-4 py-2 mb-4 text-black clear-both hover:text-white 
        font-boiold rounded-full min-w-200" onClick={()=>{
            setViewType(ViewType.AllWallets);
       }}>All wallets</button></div>

        {(viewType === ViewType.IndWallet &&
            selectedWalletPubkey) ? 
        <WalletIndView pubkey={selectedWalletPubkey}/> : 
        <WalletListView setViewType={setViewType}/> }
    
        {(viewType === ViewType.IndWallet && walletsCount === 0) || 
        viewType === ViewType.AllWallets
        &&
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
        }
    </div>
}