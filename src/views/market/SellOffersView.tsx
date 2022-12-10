import { FC } from "react";
import { TabbedView } from "../components/TabbedView";
import { SellOffersList } from "./SellOffersList";


export const SellOffersView : FC = () =>{

    return <div className="w-4/5 mx-auto">
    <TabbedView tabs={[
        {id:"public", title:"Public Sell Offers", content: <SellOffersList/>},
        {id:"private", title:"Sell Offers For You", content: <SellOffersList isPrivate={true}/>},
    ]}/></div>
}