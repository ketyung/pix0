import { FC, useState, useEffect } from "react";
import { StoredWallet } from "../../models";
import { WalletListRow } from "./WalletListRow";
import { ViewType } from "./WalletView";
import { WalletsStorage } from "../../utils/local-storage";

type Props = {

    setViewType? : (viewType : ViewType) => void,
}

export const WalletListView : FC <Props> = ({
    setViewType
}) =>{

    const [storedWallets, setStoredWallets] = useState<StoredWallet[]>();

    useEffect (()=>{

        let sws = WalletsStorage.storedWallets();
        setStoredWallets(sws);
    
    },[WalletsStorage.storedWalletsCount()]);


    return  <div className="items-left">
        {
            storedWallets?.map((w,i)=>{
                return <WalletListRow key={"wallet_"+i} wallet={w} index={i}
                setViewType={setViewType}/>;
            })
        }
    
    </div>

}
