import { fetchAsNFTMedata } from "../../utils";
import { FC, useCallback, useEffect, useState } from "react";
import { NFTMetadata } from "../../models";
import * as xrpl from 'xrpl';



type Props = {

    uri? : string,

    index? : number, 
}

export const ListRow : FC <Props> = ({
    uri, index
}) =>{

    const [mediaURI, setMediaURI] = useState<NFTMetadata>();

    const fetchURI = useCallback( async ()=>{

        let m = await fetchAsNFTMedata( xrpl.convertHexToString(uri ?? ""));
        setMediaURI(m);

    },[]);

    useEffect(()=>{

        fetchURI();
    
    },[]);

    return <div className="flex-1 w-64 p-2">
       {(index ?? 0) +1}. {mediaURI === undefined &&
        <img src={xrpl.convertHexToString(uri ?? "")} className="object-fill h-64 w-64"/>} 
    </div>


}