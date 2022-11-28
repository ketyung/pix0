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

    return <div className="flex-1 w-64 p-4 inline-block border-2 border-gray-200 m-4 
    rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
       {(index ?? 0) +1}. {mediaURI === undefined &&
        <img src={xrpl.convertHexToString(uri ?? "")} 
        className="object-scale-down h-64 w-64"/>} 
    </div>


}