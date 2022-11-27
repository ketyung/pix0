import { FC } from "react";
import usePage from "../hooks/usePage";
import { Page } from "../models";
import { WalletView } from "./wallet/WalletView";

export const MainView : FC = () =>{

    const {page} = usePage();

    const switchView = () =>{

        if ( page ) {

            switch (+page) {

                case Page.Wallet :
                    return <WalletView/>;

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