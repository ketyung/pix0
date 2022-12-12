import { FC , useState, useCallback, useEffect} from "react";
import useWalletState from "../hooks/useWalletState";
import { shortenStringTo, pubkeyOrAddress } from "../utils";
import { WalletsStorage } from "../utils/local-storage";
import useXrp from "../hooks/useXrp";
import { Spinner } from "./components/Spinner";

export const ConnectedAsView : FC = () =>{

    const [balance, setBalance] = useState<string>();

    const [loading, setLoading] = useState(false);

    const {getBalance} = useXrp();

    const {selectedWalletPubkey, signOut} = useWalletState();

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

        signOut();
        window.location.reload();
    }
    
  
    return <div className="float-right clear-both bg-gray-900 rounded-3xl text-base 
    text-sky-200 mr-20 mt-2 p-1 w-2/5 align-text-top cursor-pointer max-w-500 dropdown relative">
    <i className="fa fa-plug hidden md:inline-block lg:inline-block" aria-hidden="true"/> 
    <span className="ml-4 inline-block md:hidden lg:hidden">{shortenStringTo(
        pubkeyOrAddress(WalletsStorage.get(selectedWalletPubkey)) ?? "", 6)}</span> 
    <span className="ml-4 hidden md:inline-block lg:inline-block">{shortenStringTo(
        pubkeyOrAddress(WalletsStorage.get(selectedWalletPubkey)) ?? "", 10)}</span> 
    <span className="ml-4 hidden md:inline-block lg:inline-block">{loading ? <Spinner/> : <>{balance}</>}</span>
    <i className="ml-2 fa fa-sign-out" aria-hidden="true" onClick={()=>{
        signOutNow();
    }}/> 
    
    </div>
}