import { fetchAsNFTMedata } from "../../utils";
import { ViewType } from "./View";
import { FC, useCallback, useEffect, useState } from "react";
import { AccountNFToken, NFTMetadata } from "../../models";
import * as xrpl from 'xrpl';
import { Props } from "./List";



type IProps = {
    
    index? : number, 

    nftToken? : AccountNFToken,
    
} & Props;


export const IndNftView : FC <IProps> = ({
    index, nftToken, setViewType
}) =>{

    const [mediaURI, setMediaURI] = useState<NFTMetadata>();

    const fetchURI = useCallback( async ()=>{

        let m = await fetchAsNFTMedata( xrpl.convertHexToString(nftToken?.URI ?? ""));
        setMediaURI(m);

    },[]);

    useEffect(()=>{

        fetchURI();
    
    },[nftToken?.URI]);

    return <div className="flex-1 w-64 p-4 inline-block border-2 border-gray-200 m-4 
    rounded-2xl hover:bg-gray-200 hover:cursor-pointer"
    onClick={()=>{

        if ( setViewType) {
            setViewType({viewType : ViewType.NftDetails, param : nftToken});
        }
    }}>
       <div className={ mediaURI?.name ? 
        "rounded-t-xl text-left pl-1 bg-gray-700 text-sky-100 p-1 line-clamp-1" : "text-center"}>
        <span className="ml-2 mr-2">{(index ?? 0) +1}.</span>{mediaURI?.name && <span className="ml-2">{mediaURI.name}</span>}</div>
        <img src={mediaURI === undefined ? xrpl.convertHexToString(nftToken?.URI ?? "")
        : mediaURI.image } 
        className="object-scale-down h-64 w-64 rounded-b-xl bg-gray-100 p-2"
        title={mediaURI?.description ? mediaURI.description : "image..."}/>
    </div>


}