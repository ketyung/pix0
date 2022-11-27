import { FC } from "react";
import usePage from "../hooks/usePage";
import { Page } from "../models";
import { View as WalletView } from "./wallet/View";
import { View as MintNFTView } from "./mintNFT/View";
import { View as CollectiblesView } from "./collectibles/View";

export const MainView : FC = () =>{

    const {page} = usePage();

    const switchView = () =>{

        if ( page ) {

            switch (+page) {

                case Page.Wallet :
                    return <WalletView/>;

                case Page.MintNFT :
                    
                    return <MintNFTView/>;

                case Page.Collectibles :

                    return <CollectiblesView/>;

                default :
                    return <WalletView/>
            }
        }
        return <WalletView/>
    }

    return <div>
    {switchView()}
    </div>
}