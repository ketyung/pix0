import { StoredWallet } from "../../models";
import { WalletsStorage } from "../../utils/local-storage";
import { shortenStringTo,pubkeyOrAddress } from "../../utils";
import useXrp from "../../hooks/useXrp";
import useWalletState from "../../hooks/useWalletState";
import { Spinner } from "../components/Spinner";
import { decryptStoredWallet } from "../../utils/enc";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { CheckIcon } from "../components/icons/CheckIcon";
import { CoinIcon } from "../components/icons/CoinIcon";
import { FC, useState, useEffect, useCallback } from "react";
import { ViewType } from "./View";


type Props = {

    index? : number, 

    wallet : StoredWallet,

    setViewType? : (viewType : ViewType) => void,
}

export const WalletListRow : FC <Props> = ({
    wallet, index , setViewType
}) =>{

    const [balance, setBalance] = useState<string>();

    const [loading, setLoading] = useState(false);

    const [processing, setProcessing] = useState(false);

    const [seed, setSeed] = useState<string>();

    const {getBalance, fundWallet} = useXrp();

    const {setSelectedWallet,selectedWalletPubkey, setWalletCount} = useWalletState();

    const removeSelected = () =>{

        if ( window.confirm(`To remove wallet ${shortenStringTo(wallet.pubkey, 10)}`)){
            WalletsStorage.remove(wallet.pubkey);
            setWalletCount(WalletsStorage.storedWalletsCount());
        }
    }


    const fundWalletNow = async () =>{

        setProcessing(true);
        let w = await fundWallet(wallet);
        setProcessing(false);
        setBalance(`${w?.balance}`);
    }

    const fetchBalance = useCallback( async () =>{

        setLoading(true);
        let b = await getBalance(wallet);
        setBalance(b);
        setLoading(false);
    },[getBalance]);


    const showSeed = () =>{

        if ( seed ) {
            setSeed(undefined);
            return;
        }

        let w = WalletsStorage.get(wallet.pubkey);
        if ( w ) {         
            let dw = decryptStoredWallet(w);
            if ( dw )
                setSeed(dw.seed);
        
            setTimeout(()=>{
                setSeed(undefined);
            },10000);
        }
    }

    useEffect(()=>{
        fetchBalance();
    },[])


    const buttons = <div className="inline-block">
    <button disabled={processing} title="Fund this wallet?" 
    className="max-w-15 ml-4 pt-2 mb-2" onClick={async ()=>{
        await fundWalletNow();
    }}>{processing ? <Spinner/> : <CoinIcon/>}</button>
    
    <button title="Select this?" className="max-w-15 ml-4 pt-2 
    mb-2" onClick={()=>{
        setSelectedWallet(wallet.pubkey);
        if (setViewType) {
            setViewType(ViewType.IndWallet);
        }
    }}><CheckIcon checked={selectedWalletPubkey === wallet.pubkey}/></button>
   
    <button title="Remove?" className="max-w-15 ml-4 pt-2 
    mb-2" onClick={()=>{
        removeSelected();
    }}><DeleteIcon/></button>

    <button title="Show seed" 
    className="text-sm max-w-35 ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
    onClick={()=>{showSeed();}}>Show seed</button>
    </div>

    return <div className="items-left max-w-200 text-ellipsis 
    m-4 bg-slate-50 hover:bg-slate-200 align-top 
    rounded-3xl p-4 text-left">
    <span className="max-w-40 mr-4">{(index ?? 0) + 1}.</span> 
    <span className="min-w-200 mr-10">{shortenStringTo(
        pubkeyOrAddress(wallet) ?? "", 20)}</span>
    <div>
    <span className="mr-20 min-w-260">Balance : {loading ? <Spinner/> : <>{balance} XRP</>}</span>
    {buttons}
    </div>
    {seed && <div className="bg-gray-300 rounded-2xl p-2 pl-4 max-w-32">
    Seed : {seed} 
        <div className="text-sm">
        Please keep this safe and don't share to others
        </div>    
    </div>}
    </div>
}