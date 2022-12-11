import { FC, useState } from "react";
import { TextField } from "../components/TextField";
import { WalletsStorage } from "../../utils/local-storage";
import { shortenStringTo } from "../../utils";
import { decryptStoredWalletBy } from "../../utils/enc";


type Props = {

    walletPubkey : string 
}

export const ShowSeedView : FC <Props> = ({
    walletPubkey
}) =>{

    const [seed, setSeed] = useState<string>();

    const [pass, setPass] = useState<string>();


    const showSeed = (pw : string ) =>{

        setSeed(undefined);

        let w = WalletsStorage.get(walletPubkey);
        if ( w ) {         
            let dw = decryptStoredWalletBy(w,pw);
            if ( dw )
                setSeed(dw.seed);
            else 
                window.alert(`Incorrect password for ${shortenStringTo(walletPubkey, 10)}`);
        
            setTimeout(()=>{
                setSeed(undefined);
            },10000);
        }
    }

   
    return <div className="mt-2" style={{minWidth:"400px"}}>
        <div className="mb-4">
            <TextField label="Password" type="password" value={pass}
            onChange={(e)=>{
                setPass(e.target.value);
            }}/>
        </div>
        {seed && <div className="bg-gray-300 rounded p-2 pl-4 max-w-32">
        Seed : {seed} 
        <div className="text-sm text-red-600 mt-1">
        <i className="fa fa-exclamation-triangle mr-1"/>Please keep this safe &amp; sound and do NOT share to others
        </div>    
        </div>}
        <div className="mt-4">
            <button className="text-sm w-32 font-bold p-2 mb-2 bg-gray-900 rounded text-white"
            onClick={(e)=>{
                e.preventDefault();
                if (pass){
                    showSeed(pass)
                    setPass("");
                };

            }}>Show</button>
        </div>
    </div>
}