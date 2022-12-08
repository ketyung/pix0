import { Props } from "./OffersList";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import useXrp from "../../hooks/useXrp";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { dropsToXrp } from "xrpl";
import { FC , useCallback, useEffect, useState} from "react";


export const SellOffers : FC <Props> = ({
    tokenId
}) =>{

    const [sellOffers, setSellOffers] = useState<NFTOffer[]>();

    const [loading, setLoading] = useState(false);

    const {getNftSellOffers, cancelOffer} = useXrp();
    
    const fetchSellOffers = useCallback( async () =>{
        setLoading(true);
        let offrs = await getNftSellOffers(tokenId );
        setSellOffers(offrs);
        setLoading(false);
    },[getNftSellOffers]);


    useEffect(()=>{

        fetchSellOffers();
    
    },[tokenId]);

    const cancelOfferNow = async (id : string) =>{

        if ( window.confirm('Are you sure to cancel the selected offer?')){

            await cancelOffer(id, async (e)=>{
                if ( e instanceof Error){

                    window.alert(`Error : ${e.message}`);
                }
                else {
                    window.alert('Success!');
                    await fetchSellOffers();
                }
            });
        }

    }

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

            sellOffers?.map((s,i)=>{

                return <tr key={`so${i}`} className="hover:bg-gray-200">
                    <td>{shortenStringTo(s.nft_offer_index, 16)}</td>
                    <td className="text-center">{dropsToXrp(s.amount.toString())}</td>
                    <td className="text-center">
                    <button title="Cancel!!" onClick={async (e)=>{
                        e.preventDefault();
                        await cancelOfferNow(s.nft_offer_index);
                    }}
                    className="text-xs w-32 m-1 text-2xl p-1 mb-2 bg-red-800 rounded-xl text-white">
                    Cancel?
                    </button>
                    </td>
                </tr>
            })
        }
         {(!loading && sellOffers?.length === 0) && <tr><td colSpan={3} className="text-center p-2">
            NO Sell Offers
            </td></tr>}
        </table>
    </>
}