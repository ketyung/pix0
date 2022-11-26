import { FC, useState, useEffect } from "react";
import { StoredWallet } from "../../models";
import { WalletListRow } from "./WalletListRow";
import { WalletsStorage } from "../../utils/local-storage";

export const WalletListView : FC = () =>{

    const [storedWallets, setStoredWallets] = useState<StoredWallet[]>();

    useEffect (()=>{

        let sws = WalletsStorage.storedWallets();
        setStoredWallets(sws);

    },[]);


    return  <div className="items-left">
        {
            storedWallets?.map((w,i)=>{
                return <WalletListRow key={"wallet_"+i} wallet={w} index={i}/>;
            })
        }
    
    </div>

}
