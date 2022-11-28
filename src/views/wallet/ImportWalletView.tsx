import { FC,useState } from "react";
import useXrp from "../../hooks/useXrp";

type Props = {

    importCompletedCallback? : (completed : boolean) => void,

}


export const ImportWalletView : FC <Props> = ({
    importCompletedCallback
}) =>{

    const {walletFromSeed} = useXrp();

    const [seed, setSeed] = useState<string>();

    const importWallet = () =>{

        if (seed ){

            walletFromSeed(seed);
            setSeed(undefined);
            if ( importCompletedCallback)
                importCompletedCallback(true);
            
        }
       
    }

    return <div className="">
        <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mediaURI">
            Import wallet from seed phrase
            </label>
            <input className="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="mediaURI" type="text" placeholder="Seed phrase"
            onChange={(e)=>{
                setSeed(e.target.value);
            }}/>
        </div>
        <div className="mt-2">
            <button title="Import wallet" 
            className="text-sm max-w-35 ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={()=>{importWallet();}}>Import</button>
        </div>
        </form>
    </div>
}