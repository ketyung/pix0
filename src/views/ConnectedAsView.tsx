import { FC , useState, useCallback, useEffect} from "react";
import useWalletState from "../hooks/useWalletState";
import { shortenStringTo, pubkeyOrAddress } from "../utils";
import { WalletsStorage, WalletPasswordStorage } from "../utils/local-storage";
import useXrp from "../hooks/useXrp";
import { Spinner } from "./components/Spinner";

export const ConnectedAsView : FC = () =>{

    const [balance, setBalance] = useState<string>();

    const [loading, setLoading] = useState(false);

    const {getBalance} = useXrp();

    const {selectedWalletPubkey} = useWalletState();

    const fetchBalance = useCallback( async () =>{

        if ( selectedWalletPubkey ) {

            setLoading(true);
            let wallet = WalletsStorage.get(selectedWalletPubkey);
            if ( wallet ) {

                let b = await getBalance(wallet);
                setBalance(b);
         
            }

            setLoading(false);
          
        }
    },[getBalance]);

    useEffect(()=>{
        fetchBalance();
    },[selectedWalletPubkey])

    const signOutNow = () => {

        WalletPasswordStorage.remove();
        window.location.reload();
    }
    
  
    return <div className="float-right clear-both bg-gray-900 rounded-3xl text-base 
    text-sky-200 mr-20 mt-2 p-1 w-1/5 align-text-top cursor-pointer max-w-500 dropdown relative">
    <i className="fa fa-plug" aria-hidden="true"></i> 
    <span className="ml-4">{shortenStringTo(
        pubkeyOrAddress(WalletsStorage.get(selectedWalletPubkey ?? "")), 10)}</span> 
    <span className="ml-4">{loading ? <Spinner/> : <>{balance}</>}</span>
    <i className="ml-2 fa fa-sign-out" aria-hidden="true" onClick={()=>{
        signOutNow();
    }}/> 
    
    </div>
}