import { Props } from "./OffersList";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import useXrp from "../../hooks/useXrp";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { dropsToXrp } from "xrpl";
import { FC , useCallback, useEffect, useState} from "react";


export const BuyOffers : FC <Props> = ({
    tokenId
}) =>{

    const [buyOffers, setBuyOffers] = useState<NFTOffer[]>();

    const [loading, setLoading] = useState(false);

    const {getNftBuyOffers} = useXrp();
    
    const fetchBuyOffers = useCallback( async () =>{

        setLoading(true);
        let offrs = await getNftBuyOffers(tokenId );
        setBuyOffers(offrs);
        setLoading(false);
    },[getNftBuyOffers]);


    useEffect(()=>{
        fetchBuyOffers();
    },[tokenId]);

    return <>
        <table cellPadding={3} cellSpacing={3} className="text-left w-full">
            <tr className="bg-gray-300">
            <th style={{width:"60%"}}>ID</th>
            <th style={{width:"20%"}} className="text-center">Price (XRP)</th>
            <th style={{width:"20%"}} className="text-center">Action</th>
            </tr>
        {
            loading ? 
            <tr><td colSpan={3} className="text-center p-2">
            <Spinner/>    
            </td></tr> :

            buyOffers?.map((s,i)=>{

                return <tr key={`so${i}`} className="hover:bg-gray-200">
                    <td>{shortenStringTo(s.nft_offer_index, 16)}</td>
                    <td className="text-center">{dropsToXrp(s.amount.toString())}</td>
                    <td className="text-center">
                    <button title="Cancel!!"
                    className="text-xs w-32 m-1 text-2xl p-1 mb-2 bg-green-800 rounded-xl text-white">
                    Accept?
                    </button>
                    </td>
                    
                </tr>
            })
        }

        {(!loading && buyOffers?.length === 0) && <tr><td colSpan={3} className="text-center p-2">
            NO Buy Offers
            </td></tr>}
        </table>
    </>
}