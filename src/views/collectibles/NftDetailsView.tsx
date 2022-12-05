import { fetchAsNFTMedata } from "../../utils";
import { FC , useState, useCallback, useEffect} from "react";
import * as xrpl from 'xrpl';


import { AccountNFToken, NFTMetadata } from "../../models";

type Props = {

    nftToken? : AccountNFToken,
}


export const NftDetailsView : FC <Props> = ({
    nftToken
}) =>{

    const [mediaURI, setMediaURI] = useState<NFTMetadata>();

    const fetchURI = useCallback( async ()=>{

        let m = await fetchAsNFTMedata( xrpl.convertHexToString(nftToken?.URI ?? ""));
        setMediaURI(m);

    },[]);

    useEffect(()=>{

        fetchURI();
    
    },[nftToken?.URI]);


    return <div className="mt-2 border-2 border-gray-200 m-4 max-w-4/5 rounded-2xl text-center">
    <div className="mb-2 text-center mt-2 p-2">
     <img src={mediaURI === undefined ? xrpl.convertHexToString(nftToken?.URI ?? "")
        : mediaURI.image } 
        className="object-scale-down h-80 w-80 mb-2 content-center"
        title={mediaURI?.description ? mediaURI.description : "image..."}/>
    </div>
    {mediaURI?.name && <div className="mb-4 font-bold">{mediaURI?.name}</div>}
    {mediaURI?.description && <div className="mb-4">{mediaURI?.description}</div>}


    </div>
}