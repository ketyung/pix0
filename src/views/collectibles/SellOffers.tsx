import { Props } from "./OffersList";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import useXrp from "../../hooks/useXrp";
import useService from "../../hooks/useService";
import useWalletState from "../../hooks/useWalletState";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { dropsToXrp } from "xrpl";
import { FC , useCallback, useEffect, useState} from "react";


export const SellOffers : FC <Props> = ({
    tokenId
}) =>{

    const [sellOffers, setSellOffers] = useState<NFTOffer[]>();

    const [loading, setLoading] = useState(false);

    const [processing, setProcessing] = useState<{index?: number, 
        processing: boolean}>({processing :false});

    const {getNftSellOffers, cancelOffer} = useXrp();

    const {deleteOffer} = useService();
    
    const fetchSellOffers = useCallback( async () =>{
        setLoading(true);
        let offrs = await getNftSellOffers(tokenId );
        setSellOffers(offrs);
        setLoading(false);
    },[getNftSellOffers]);


    const {selectedWalletPubkey} = useWalletState();

    useEffect(()=>{

        fetchSellOffers();
    
    },[tokenId]);

    const cancelOfferNow = async (id : string, index? : number) =>{

        if ( window.confirm('Are you sure to cancel the selected offer?')){

            setProcessing({processing : true, index : index});
            await cancelOffer(id, async (e)=>{
                setProcessing({processing : false , index : undefined});
           
                if ( e instanceof Error){

                    window.alert(`Error : ${e.message}`);
                }
                else {
                    window.alert('Success!');
                    await deleteOffer(id);
                    await fetchSellOffers();
                }
               
            });
        }

    }

    return <>
        <table cellPadding={3} cellSpacing={3} className="text-left w-full">
            <tr className="bg-gray-300">
            <th style={{width:"45%"}}>ID</th>
            <th style={{width:"25%"}}>For</th>
            <th style={{width:"15%"}} className="text-center">Price (XRP)</th>
            <th style={{width:"15%"}} className="text-center">Action</th>
            </tr>
        {
            loading ? 
            <tr><td colSpan={3} className="text-center p-2">
            <Spinner/>    
            </td></tr> :

            sellOffers?.map((s,i)=>{

            
                return <tr key={`so${i}`} className="hover:bg-gray-200">
                    <td>{shortenStringTo(s.nft_offer_index, 16)}</td>
                    <td title={s.destination ?? ""} className="text-left">{
                    shortenStringTo(s.destination ?? "public",10)}</td>
                    <td className="text-center">{dropsToXrp(s.amount.toString())}</td>
                    <td className="text-center">
                    <button title="Cancel!!" disabled={processing.processing} 
                    onClick={async (e)=>{
                        e.preventDefault();
                        await cancelOfferNow(s.nft_offer_index, i);
                    }}
                    className="text-xs w-28 m-1 text-2xl p-1 mb-2 bg-red-800 rounded-xl text-white">
                    {(processing.processing && processing.index === i) ? <Spinner/> : <>Cancel?</>}
                    </button>
                    </td>
                </tr>
            })
        }
         {(!loading && sellOffers?.length === 0) && <tr><td colSpan={4} className="text-center p-2">
            NO Sell Offers
        </td></tr>}
        </table>
    </>
}