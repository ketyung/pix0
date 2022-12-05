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
    
    },[uri]);

    return <div className="flex-1 w-64 p-4 inline-block border-2 border-gray-200 m-4 
    rounded-2xl hover:bg-gray-200 hover:cursor-pointer">
       <div className={ mediaURI?.name ? "rounded-t-xl text-left pl-1 bg-gray-700 text-sky-100 p-1" : "text-center"}>
        {(index ?? 0) +1}. {mediaURI?.name && <span className="ml-2">{mediaURI.name}</span>}</div>
        <img src={mediaURI === undefined ? xrpl.convertHexToString(uri ?? "")
        : mediaURI.image } className="object-scale-down h-64 w-64 rounded-b-xl bg-gray-100 p-2"/>

    </div>


}