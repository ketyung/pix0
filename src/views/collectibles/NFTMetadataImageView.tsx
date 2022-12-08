import { FC, useCallback, useEffect, useState  } from "react";
import { NFTMetadata } from "../../models";
import { fetchAsNFTMedata } from "../../utils";
import * as xrpl from 'xrpl';

type Props = {

    hexUri? : string, 

    size? : {width: number, height: number},

    setMetadataCallback? : (metadata : NFTMetadata) => void,
}

export const NFTMetadataImageView : FC <Props> = ({
    hexUri, size, setMetadataCallback
}) =>{

    const [metadata, setMetadata] = useState<NFTMetadata>();


    const fetchURI = useCallback( async ()=>{

        let m = await fetchAsNFTMedata( xrpl.convertHexToString(hexUri ?? ""));
        setMetadata(m);
        if ( setMetadataCallback && m) {
            setMetadataCallback(m);
        }

    },[fetchAsNFTMedata]);

    useEffect(()=>{

        fetchURI();
    
    },[hexUri]);



    return <img src={metadata === undefined ? xrpl.convertHexToString(hexUri ?? "")
        : metadata.image } 
        className={`object-scale-down h-${size?.height ?? 80} w-${size?.width ?? 80} 
        my-2 content-center mx-auto`}
        title={metadata?.description ? metadata.description : "image..."}/>;
}