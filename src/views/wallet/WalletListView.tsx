import { FC, useState, useEffect } from "react";
import { StoredWallet } from "../../models";
import { WalletsStorage } from "../../utils/local-storage";

export const WalletListView : FC = () =>{

    const [storedWallets, setStoredWallets] = useState<StoredWallet[]>();

    useEffect (()=>{

        let sws = WalletsStorage.storedWallets();
        setStoredWallets(sws);

    },[]);


    return  <div className="items-left">
        {
            storedWallets?.map(w=>{
                return <div className="items-left max-w-200 text-ellipsis">
                {w.pubkey}
                </div>;
            })
        }
    
    </div>

}
