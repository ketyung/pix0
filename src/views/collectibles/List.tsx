import { FC, useState, useEffect, useCallback } from "react";
import { NFTResult } from "../../models";
import { ListRow } from "./ListRow";
import useXrp from "../../hooks/useXrp";

export const List : FC = () =>{

    const {getNftsOf} = useXrp();

    const [nftResult, setNftResult] = useState<NFTResult>();

    const fetchNfts = useCallback(async ()=>{

        let res = await getNftsOf();
        setNftResult(res);

    },[getNftsOf]);

    useEffect(()=>{
        fetchNfts();
    },[]);

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
    {nftResult?.nfts.map((n,i)=>{

        return <ListRow uri={n.URI} index={i} key={`_media_${i}`}/>
    })} 
    </div>;

}