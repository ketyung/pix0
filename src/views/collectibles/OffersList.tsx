import useXrp from "../../hooks/useXrp";
import { dropsToXrp } from "xrpl";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import { FC , useCallback, useEffect, useState} from "react";


type Props = {
    tokenId : string,
}

export const OffersList : FC <Props> = ({
    tokenId
}) =>{

    const [sellOffers, setSellOffers] = useState<NFTOffer[]>();

    const [loading, setLoading] = useState(false);

    const {getNftSellOffers} = useXrp();
    
    const fetchSellOffers = useCallback( async () =>{

        setLoading(true);
        let offrs = await getNftSellOffers(tokenId );
        setSellOffers(offrs);
        setLoading(false);
    },[getNftSellOffers]);


    useEffect(()=>{

        fetchSellOffers();
    
    },[tokenId]);


    return <div className="w-full text-sm" style={{minWidth:"600px"}}>
        <h2 className="uppercase font-bold">Your Sell Offers</h2>
        <table cellPadding={3} cellSpacing={3} className="text-left w-full">
            <tr className="bg-gray-200">
            <th style={{width:"60%"}}>Index</th>
            <th style={{width:"20%"}} className="text-center">Price (XRP)</th>
            <th style={{width:"20%"}} className="text-center">Action</th>
            </tr>
        {
            loading ? 
            <tr><td colSpan={3} className="text-center p-2">
            <Spinner/>    
            </td></tr> :

            sellOffers?.map((s,i)=>{

                return <tr key={`so${i}`} className="hover:bg-gray-300">
                    <td>{shortenStringTo(s.nft_offer_index, 16)}</td>
                    <td className="text-center">{dropsToXrp(s.amount.toString())}</td>
                    <td className="text-center">
                    <button title="Cancel!!"
                    className="text-xs w-32 m-1 text-2xl p-1 mb-2 bg-red-800 rounded-xl text-white">
                    Cancel?
                    </button>
                    </td>
                    
                </tr>
            })
        }
        </table>
    </div>
}