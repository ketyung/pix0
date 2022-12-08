import { FC , useState} from "react";
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

    return <div className="mb-4 p2">
      <div className="mb-2">
        <span className="mr-2">{((index ?? 0) + 1)}.</span>  
        {metadata?.name && <span className="ml-2">{metadata?.name}</span>}
      </div>
      <div className="mb-2">
      <NFTMetadataImageView hexUri={offer?.nft_token?.URI} setMetadataCallback={setMetadata}/>
      </div>
      {metadata?.description &&  <div className="mb-2 text-left">
     {metadata?.description}</div>}
    </div>
}