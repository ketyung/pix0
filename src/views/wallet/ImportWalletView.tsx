import { FC,useState } from "react";
import { TextField } from "../components/TextField";
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

            walletFromSeed(seed,
            (e)=>{

                setSeed(undefined);
                if (e instanceof Error) {
                    
                    window.alert(e.message);
                    if ( importCompletedCallback)
                        importCompletedCallback(false);
           
                }
                else {
                    if ( importCompletedCallback)
                        importCompletedCallback(true);
                }

            });
            
            
        }
       
    }

    return <div>
        <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
            <TextField id="mediaURI" label="Import wallet from seed" 
            autoComplete="off" type="password" placeholder="Seed phrase"
            onChange={(e)=>{
                setSeed(e.target.value);
            }}/>
        </div>
        <div className="mt-2">
            <button title="Import wallet" 
            className="text-sm min-w-35 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={()=>{importWallet();}}>Import</button>
        </div>
        </form>
    </div>
}