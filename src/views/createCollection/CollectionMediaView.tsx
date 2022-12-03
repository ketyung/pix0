import { FC, useEffect, useCallback, useState } from "react";
import { CollectionMedia } from "../../models/collection";
import useService from "../../hooks/useService";
import { IndMediaView } from "./IndMediaView";
import { Spinner } from "../components/Spinner";


type Props = {

    collectionId? : string, 
}

export const CollectionMediaView : FC <Props> = ({
    collectionId
}) =>{

    const [medias,setMedias] = useState<CollectionMedia[]>();

    const {getCollectionsMediaBy, loading} = useService();

    const fetchCollectionMedia = useCallback(async ()=>{

        if ( collectionId ) {
            let res = await getCollectionsMediaBy(collectionId);
            setMedias(res.res);
        }
     
    },[getCollectionsMediaBy]);

    useEffect(()=>{
        fetchCollectionMedia();
    },[]);

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-center">
    {
    loading ? <Spinner/> : 
    medias?.map((m,i)=>{

        return <IndMediaView media={m} index={i} key={`media_${i}`}/>
    })}
    </div>
}