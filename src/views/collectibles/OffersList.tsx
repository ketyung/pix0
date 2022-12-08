import { FC } from "react"
import { SellOffers } from "./SellOffers"
import { TabbedView } from "../components/TabbedView"


export type Props = {
    tokenId : string,
}

export const OffersList : FC <Props> = ({
    tokenId
}) =>{

    
    return <div className="w-full text-sm" style={{minWidth:"600px"}}>
        <TabbedView tabs={[
            {id: "tab1", title:"Sell Offers", content: <SellOffers tokenId={tokenId}/>},
            {id: "tab2", title:"Buy Offers", content: <p>Buy offers...</p>}

        ]}/>
    </div>
}