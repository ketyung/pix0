import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback, useEffect} from "react";
import { SelectedWalletStorage, WalletsStorage } from "../utils/local-storage";
import { WalletPasswordStorage } from "../utils/sess-storage";
import { WalletState } from "../utils/sm/WalletStateReducer";
import { setWalletsCount as setWalletCnt, setSelectedWallet as setSelWallet} from "../utils/sm/WalletActions";


export default function useWalletState() {

    const dispatch: Dispatch<any> = useDispatch();

    const setSelectedWallet = useCallback((pubkey : string|undefined) => {
        if ( pubkey)
            SelectedWalletStorage.setSelected(pubkey);
        dispatch(setSelWallet(pubkey));
    },[dispatch]);

    const setWalletCount = useCallback((count : number) => 
        dispatch(setWalletCnt(count)),
    [dispatch]);

    const walletState : WalletState =  useSelector(
        (_state: any) => {return _state.walletStateReducer;}, shallowEqual
    );

    const walletsCount : number|undefined = walletState.walletsCount;

    const selectedWalletPubkey : string|undefined = walletState.selectedWalletPubkey;

    const refreshWalletCount = () =>{

        setWalletCount(WalletsStorage.storedWalletsCount());
    }

    const signOut = () =>{

        WalletPasswordStorage.remove();
        //WalletsStorage.removeAll();
        //SelectedWalletStorage.remove();
    }


    useEffect(()=>{
        setSelectedWallet(SelectedWalletStorage.getSelected());
        setWalletCount( WalletsStorage.storedWalletsCount());
    },[]);
    
   
    return {setSelectedWallet, setWalletCount, walletsCount, selectedWalletPubkey, 
        signOut, refreshWalletCount} as const;

}