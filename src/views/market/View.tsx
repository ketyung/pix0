import { FC } from "react";
import { SellOffersList } from "./SellOffersList";

export const View : FC = () =>{

    return <div className="mt-10">
        <h1 className="font-bold">Sell/Buy your NFT</h1>
        <SellOffersList/>        
    </div>
}