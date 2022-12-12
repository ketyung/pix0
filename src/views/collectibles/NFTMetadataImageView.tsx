import { FC, useCallback, useEffect, useState  } from "react";
import { NFTMetadata } from "../../models";
import { fetchAsNFTMedata } from "../../utils";
import placeholder from '../../images/placeholder100.svg';
import * as xrpl from 'xrpl';


type Props = {

    hexUri? : string, 

    className? : string, 

    setMetadataCallback? : (metadata : NFTMetadata) => void,

    style? : React.CSSProperties,

}

export const NFTMetadataImageView : FC <Props> = ({
    hexUri, setMetadataCallback, className, style
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
        : metadata.image } style={style} placeholder={placeholder}
        className={className ?? "object-scale-down h-80 w-80 my-2 content-center mx-auto"}
        title={metadata?.description ? metadata.description : "image..."}/>;
}