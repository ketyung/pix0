import { FC } from "react";
import { SellOffersView } from "./SellOffersView";

export const View : FC = () =>{

    return <div className="mt-20">
        <h1 className="font-bold">Buy/Sell your NFT</h1>
        <SellOffersView/>        
    </div>
}