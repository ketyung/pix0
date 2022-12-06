import { FC, useEffect, useCallback, useState } from "react";
import { Collection, CollectionMedia } from "../../models/collection";
import useService from "../../hooks/useService";
import { IndMediaView } from "./IndMediaView";
import { Spinner } from "../components/Spinner";


type Props = {

    collection : Collection, 
}

export const CollectionMediaView : FC <Props> = ({
    collection
}) =>{

    const [medias,setMedias] = useState<CollectionMedia[]>();

    const {getCollectionsMediaBy, loading} = useService();

    const fetchCollectionMedia = useCallback(async ()=>{

        if ( collection && collection._id ) {
            let res = await getCollectionsMediaBy(collection._id);
            setMedias(res.res);
        }
     
    },[getCollectionsMediaBy]);

    useEffect(()=>{
        fetchCollectionMedia();
    },[]);

    return <div className="m-auto p-2 mt-4 border-2 border-gray-200 rounded-3xl w-8/12 mb-10 text-center">
    <div className="mb-2">Media in collection <span className="font-bold">{collection.name}</span></div>
    {
    loading ? <Spinner/> : 
    medias?.map((m,i)=>{

        return <IndMediaView media={m} index={i} key={`media_${i}`}/>
    })}
    </div>
}