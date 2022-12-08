import { FC } from "react";
import { SellOffersList } from "./SellOffersList";

export const View : FC = () =>{

    return <div className="mt-20">
        <h1 className="font-bold">Buy/Sell your NFT</h1>
        <SellOffersList/>        
    </div>
}