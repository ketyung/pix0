import { FC , useState, useCallback, useEffect} from "react";
import { Spinner } from "../components/Spinner";
import { dateToTimeAgo, shortenStringTo } from "../../utils";
import { NFTOffer } from "xrpl/dist/npm/models/common";
import useXrp from "../../hooks/useXrp";
import { NFTMetadataImageView } from "../collectibles/NFTMetadataImageView";
import { NFTMetadata } from "../../models";
import { Offer } from "../../models/token_offer";


type Props = {

    offer? : Offer, 

    index? : number, 
}


export const OfferListRow : FC <Props> = ({
    offer, index, 
}) =>{

    const [metadata, setMetadata] = useState<NFTMetadata>();

    const [processing, setProcessing] = useState(false);

    const [nftOffer, setNftOffer] = useState<NFTOffer>();

    const timeAgo = dateToTimeAgo(offer?.date_created);

    const {acceptSellOffer, getNftSellOffers} = useXrp();

    const fetchSellOffers = useCallback( async () =>{

        if ( offer?.nft_token?.NFTokenID) {

            let offrs = await getNftSellOffers( offer?.nft_token?.NFTokenID );
            if ( offrs && (offrs?.length ?? 0) > 0 ){
                setNftOffer(offrs[0]);
            }
        }
        
    },[getNftSellOffers]);


    useEffect(()=>{
        fetchSellOffers();
    },[]);


    const buy = async () =>{

        if ( nftOffer ) {

            setProcessing(true);
            await acceptSellOffer(nftOffer,
            (e)=>{

                if ( e instanceof Error){
                    window.alert(`Error : ${e.message}`);
                }
                else {
                    window.alert("Success!");
                }

                setProcessing(false);
            });
        }
        
    }


    return <div className="mb-6 p-4 border-b-2 hover:bg-gray-200 rounded-2xl w-1/2 mx-auto shadow-2xl">
      <div className="mb-2 text-left font-bold">
        <span className="mr-2">{((index ?? 0) + 1)}.</span>  
        {metadata?.name && <span className="ml-2">{metadata?.name}</span>}
      </div>
      <div className="mb-2 text-left">
      <div className="inline-block mt-2">
      <NFTMetadataImageView hexUri={offer?.nft_token?.URI} setMetadataCallback={setMetadata}
      className="object-scale-down my-2" style={{width:"80px",height:"80px"}}/>
      </div>
      <div className="inline-block mt-2 ml-2">
            <div className="mb-2">
            <span className="mr-2 ml-2">Price:</span><span className="font-bold">{offer?.price ?? 1} XRP</span>
            </div>
            <button title="Buy..." disabled={processing}
            className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-gray-800 text-center 
            rounded-3xl text-white inline-block m-2" 
            onClick={async (e)=>{
                e.preventDefault();
                await buy();
            }}>{processing ? <Spinner/> : <>Buy</>}</button> 
            <button title="Create Buy Offer..." disabled={processing}
            className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-purple-600 text-center 
            rounded-3xl text-white inline-block m-2" 
            onClick={async (e)=>{
                e.preventDefault();
                window.alert("Coming sooon...");
            }}>{processing ? <Spinner/> : <>Offer</>}</button> 
            <button title="More Details..." disabled={processing}
            className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-blue-600 text-center 
            rounded-3xl text-white inline-block m-2" 
            onClick={async (e)=>{
                e.preventDefault();
                window.alert("Coming sooon...");
            }}>{processing ? <Spinner/> : <>Details</>}</button>  

            <div className="mb-2 pl-2 text-xs" title={offer?.date_created?.toString()}>
            <span className="mr-2">Listed: {timeAgo.short}</span>
            <span title={offer?.created_by.classic_address} 
            className="ml-2">By: { shortenStringTo(offer?.created_by.classic_address ?? "", 10)}</span>
            </div>
      </div>
    
      </div>
    
      {metadata?.description && <div className="mb-2 text-left line-clamp-1">
     {metadata?.description}</div>}
    
    </div>
}