import { FC, useState } from "react";
import { WalletListView } from "./WalletListView";
import { WalletIndView } from "./WalletIndView";
import { ImportWalletView } from "./ImportWalletView";
import useWalletState from "../../hooks/useWalletState";
import { InfoView } from "../components/InfoView";
import { CloseIcon } from "../components/icons/CloseIcon";
import useXrp from "../../hooks/useXrp";

export enum ViewType {

    AllWallets,

    IndWallet, 

    ImportWallet, 
}


export const View : FC = () =>{

    const {genWallet} = useXrp();

    const [viewType, setViewType] = useState<ViewType>(ViewType.IndWallet);

    const {selectedWalletPubkey, walletsCount} = useWalletState();

    const importWalletCompleted = (completed : boolean) =>{

        if (completed) {
            setViewType(ViewType.AllWallets);
        }
        else {

            setViewType(ViewType.ImportWallet);
        }
    }

    const switchView = () =>{

        if ( viewType ) {

           // console.log("viewType::", viewType, walletsCount);

            switch(+viewType) {


                case ViewType.IndWallet :

                    return walletsCount === 0 ? 
                    <div><InfoView 
                    title="FYI"
                    text="You do NOT have any wallet yet, create or import one"/>
                    <div className="mt-4">{buttons}</div></div> : 
                    (selectedWalletPubkey ? 
                        <WalletIndView pubkey={selectedWalletPubkey}/>
                        : <WalletListView setViewType={setViewType}/>)
    
                case ViewType.AllWallets :
                
                    return <WalletListView setViewType={setViewType}/>
          
                case ViewType.ImportWallet :

                    return <ImportWalletView importCompletedCallback={importWalletCompleted}/>
                
                default :
    
                    return <WalletListView setViewType={setViewType}/>
            }
        }
        else {

            return <WalletListView setViewType={setViewType}/>
       
        }
        
    }


    const buttons =<div>
        <button
        onClick={()=>{
            genWallet();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
        px-4 rounded-full min-w-200 mr-4">
        Create Wallet
        </button>

        <button 
        onClick={()=>{
            setViewType(ViewType.ImportWallet);
        }}
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 
        px-4 rounded-full min-w-200 ml-4">
        Import Wallet
        </button>
    </div>;


   
    return <div className="m-auto p-10 mt-20 border-2 border-gray-200 rounded-3xl w-4/5 shadow-2xl text-center">
        
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

        {switchView() }
    
        {viewType === ViewType.AllWallets
        && buttons}
    </div>
}