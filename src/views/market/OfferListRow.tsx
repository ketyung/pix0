import { FC , useState} from "react";
import { Spinner } from "../components/Spinner";
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

    return <div className="mb-6 p-4 border-b-2 hover:bg-gray-200 rounded-2xl w-1/2 mx-auto shadow-2xl">
      <div className="mb-2 text-left font-bold">
        <span className="mr-2">{((index ?? 0) + 1)}.</span>  
        {metadata?.name && <span className="ml-2">{metadata?.name}</span>}
      </div>
      <div className="mb-2 text-left">
      <NFTMetadataImageView hexUri={offer?.nft_token?.URI} setMetadataCallback={setMetadata}
      className="object-scale-down my-2 inline-block" style={{width:"80px",height:"80px"}}/>
      <div className="inline-block mt-2 ml-2">
        <div className="mb-2"><span className="mr-2 ml-2">Price:</span><span className="font-bold">{offer?.price ?? 1} XRP</span></div>
        <button title="Buy..." disabled={processing}
        className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-gray-800 text-center 
        rounded-3xl text-white inline-block m-2" 
        onClick={async (e)=>{
            e.preventDefault();
        }}>{processing ? <Spinner/> : <>Buy</>}</button> 
        <button title="Create Buy Offer..." disabled={processing}
        className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-purple-600 text-center 
        rounded-3xl text-white inline-block m-2" 
        onClick={async (e)=>{
            e.preventDefault();
        }}>{processing ? <Spinner/> : <>Offer</>}</button> 
          <button title="More Details..." disabled={processing}
        className="text-sm w-20 font-bold text-sm p-2 mb-2 bg-blue-600 text-center 
        rounded-3xl text-white inline-block m-2" 
        onClick={async (e)=>{
            e.preventDefault();
        }}>{processing ? <Spinner/> : <>Details</>}</button>  
      </div>
    
      </div>
    
      {metadata?.description && <div className="mb-2 text-left line-clamp-1">
     {metadata?.description}</div>}
    
    </div>
}