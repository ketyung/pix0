import { FC, useCallback, useEffect, useState  } from "react";
import { NFTMetadata } from "../../models";
import { fetchAsNFTMedata } from "../../utils";
import * as xrpl from 'xrpl';

type Props = {

    hexUri? : string, 

    className? : string, 

    setMetadataCallback? : (metadata : NFTMetadata) => void,
}

export const NFTMetadataImageView : FC <Props> = ({
    hexUri, setMetadataCallback, className
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
        className={className ?? "object-scale-down h-80 w-80 my-2 content-center mx-auto"}
        title={metadata?.description ? metadata.description : "image..."}/>;
}