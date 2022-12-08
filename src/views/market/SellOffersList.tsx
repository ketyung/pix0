import { FC, useState, useCallback, useEffect } from "react";
import { OfferType, Offer } from "../../models/token_offer";
import useService from "../../hooks/useService";
import { OfferListRow } from "./OfferListRow";


export const SellOffersList : FC = () =>{

    const {getOffers} = useService();

    const [offers, setOffers] = useState<Offer[]>();

    const fetchOffers = useCallback(async ()=>{

        let o = await getOffers(OfferType.Sell);

        if ( o ) {
            setOffers(o.res);
        }

    },[getOffers]);

    useEffect(()=>{
        fetchOffers();
    },[]);

    return <div className="mt-2">
        { offers?.map((o,i)=>{
            return <OfferListRow offer={o} index={i}/>
        })}
    </div>
}