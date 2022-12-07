import { FC, useState, useEffect, useCallback } from "react";
import { NFTResult } from "../../models";
import {IndNftView } from "./IndNftView";
import { Spinner } from "../components/Spinner";
import { ViewType } from "./View";
import useXrp from "../../hooks/useXrp";

export type Props = {

    setViewType? : (viewType : { viewType : ViewType, param? : any}) => void, 
}

export const List : FC <Props> = ({
    setViewType
}) =>{

    const {getNftsOf} = useXrp();

    const [nftResult, setNftResult] = useState<NFTResult>();

    const [loading, setLoading] = useState(false);

    const fetchNfts = useCallback(async ()=>{

        setLoading(true);
        let res = await getNftsOf();
        setNftResult(res);
        setLoading(false);
    },[getNftsOf]);

    useEffect(()=>{
        fetchNfts();
    },[]);

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-center">
    { loading ? <Spinner/> :
    nftResult?.nfts.map((n,i)=>{

        return <IndNftView nftToken={n} index={i} key={`_media_${i}`} setViewType={setViewType}/>
    })} 
    { (!loading && nftResult?.nfts.length === 0) && <div className="mt-2 text-lg">You do NOT have any collectable,
        mint some or buy them from the market place</div>}
    </div>;

}