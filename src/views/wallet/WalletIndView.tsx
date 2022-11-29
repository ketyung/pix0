import { FC, useEffect, useState, useCallback } from "react";
import { StoredWallet } from "../../models";
import { shortenStringTo, pubkeyOrAddress } from "../../utils";
import { Spinner } from "../components/Spinner";
import useXrp from "../../hooks/useXrp";
import { WalletsStorage } from "../../utils/local-storage";

type Props = {
    pubkey : string, 
}

export const WalletIndView : FC <Props> = ({
    pubkey 
}) =>{

    const [storedWallet, setStoredWallet] = useState<StoredWallet>();

    const [balance, setBalance] = useState<string>();

    const [loading, setLoading] = useState(false);

    const {getBalance} = useXrp();

    useEffect(()=>{

        let sw = WalletsStorage.get(pubkey);
        setStoredWallet(sw);

        fetchBalance(sw);
  
    },[pubkey]);

    const fetchBalance = useCallback( async (_storedWallet? : StoredWallet) =>{

        if (_storedWallet) {
            setLoading(true);
            let b = await getBalance(_storedWallet);
            setBalance(b);
            setLoading(false);    
        }
    },[getBalance]);

  
    return <div className="items-left max-w-200 text-ellipsis 
    m-4 bg-slate-50 hover:bg-slate-200 align-top 
    rounded-3xl p-2 pb-5 text-left pl-20">
     <div className="max-w-200 mr-10 mb-4">{shortenStringTo(pubkeyOrAddress(storedWallet) ?? "", 20)}</div>
     <div className="mr-20">Balance : {loading ? <Spinner/> : <>{balance} XRP</>}</div>
    </div>
}