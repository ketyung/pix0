import { FC, useState } from "react";
import { Spinner } from "../components/Spinner";
import { WalletListView } from "./WalletListView";
import { WalletsStorage } from "../../utils/local-storage";
import useXrp from "../../hooks/useXrp";


export const WalletView : FC = () =>{

    const {genWallet} = useXrp();

    const [loading, setLoading] = useState(false);

    const genWalletNow = async () =>{

        setLoading(true);
        await genWallet();
        setLoading(false);
    }

    return <div className="m-auto p-10 mt-20 border-2 border-gray-200 rounded-3xl max-w-2xl text-center">

        {<WalletListView/> 
        /*        
        <button onClick={()=>{

            WalletsStorage.removeAll();
        }}>Remove All</button>
        */
        }
        
        <div>
        <button 
        onClick={async ()=>{

            await genWalletNow();
        }}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full min-w-200">
        {loading ? <Spinner/> : <>Create Wallet</>}
        </button>
        </div>

    </div>
}