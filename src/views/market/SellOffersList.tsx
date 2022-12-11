import { FC, useState, useCallback, useEffect } from "react";
import { OfferType, Offer } from "../../models/token_offer";
import useService from "../../hooks/useService";
import { OfferListRow } from "./OfferListRow";
import { Spinner } from "../components/Spinner";

type Props = {
    isPrivate? : boolean,
}

export const SellOffersList : FC <Props> = ({
    isPrivate
}) =>{

    const {getOffers, getPrivateOffers} = useService();

    const [offers, setOffers] = useState<Offer[]>();

    const [loading, setLoading] = useState(false);

    const getOffersNow = async () =>{

        return isPrivate ? await getPrivateOffers(OfferType.Sell) : 
        await getOffers(OfferType.Sell);
    }

    const fetchOffers = useCallback(async ()=>{

        setLoading(true);
        let o = await getOffersNow();

        if ( o ) {
            setOffers(o.res);
        }

        setLoading(false);

    },[getOffersNow]);

    useEffect(()=>{
        fetchOffers();
    },[]);

    const setToReload = async ( reload : boolean) =>{
        if ( reload){
            await fetchOffers();
        }
    }

    return <div className="mt-2 p-2 text-center content-center mx-auto">
        <h2 className="font-bold mt-4 mb-2">{isPrivate ? "Sell Offers For You" : "Public Sell Offers" } </h2>
        {loading ? <Spinner/> : offers?.map((o,i)=>{
            return <OfferListRow offer={o} index={i} setToReloadList={setToReload} key={`O${i}`}/>
        })}
        {(!loading && offers?.length === 0) && <p className="mt-4 uppercase">
        <i className="fa fa-exclamation-triangle mr-4"/>It's empty here...</p> }
    </div>
}