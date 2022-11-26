import { StoredWallet } from "../../models";
import { WalletsStorage } from "../../utils/local-storage";
import { shortenStringTo } from "../../utils";
import useXrp from "../../hooks/useXrp";
import { Spinner } from "../components/Spinner";
import { DeleteIcon } from "../icons/DeleteIcon";
import { CoinIcon } from "../icons/CoinIcon";
import { FC, useState, useEffect, useCallback } from "react";


type Props = {

    index? : number, 

    wallet : StoredWallet,
}

export const WalletListRow : FC <Props> = ({
    wallet, index
}) =>{

    const [balance, setBalance] = useState<string>();

    const [loading, setLoading] = useState(false);

    const {getBalance} = useXrp();

    const removeSelected = () =>{

        if ( window.confirm(`To remove wallet ${shortenStringTo(wallet.pubkey, 10)}`)){
            WalletsStorage.remove(wallet.pubkey);
        }
    }

    const fetchBalance = useCallback( async () =>{

        setLoading(true);
        let b = await getBalance(wallet);
        setBalance(b);
        setLoading(false);
    },[getBalance]);

    useEffect(()=>{
        fetchBalance();
    },[])

    return <div className="items-left max-w-200 text-ellipsis 
    m-4 bg-slate-50 hover:bg-slate-200 align-top 
    rounded-3xl p-2 pb-5">
    <span className="max-w-40 mr-4">{(index ?? 0) + 1}.</span> 
    <span className="max-w-200">{shortenStringTo(wallet.pubkey, 20)}</span>
    <button title="Fund this wallet?" className="max-w-15 ml-4 pt-2 mb-2" onClick={()=>{
    }}><CoinIcon/></button>
    <button title="Remove?" className="max-w-15 ml-4 pt-2 mb-2" onClick={()=>{
        removeSelected();
    }}><DeleteIcon/></button>
    <br/>
    Balance : {loading ? <Spinner/> : <>{balance}</>}
    </div>
}