import { FC, useCallback, useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { ViewType } from "./View";
import { Collection } from "../../models/collection";
import { CollectionView } from "./CollectionView";


type Props = {

    setViewType? : (viewType : { viewType : ViewType, param?: any}) => void, 
}


export const PubCollectionsView : FC <Props> = ({
    setViewType
}) =>{

    const [collections, setCollections] = useState<Collection[]>();

    const {getPublishedCollections} = useService();

    const fetchPublishedCollections = useCallback(async ()=>{
        let c = await getPublishedCollections();
        if ( c )
            setCollections(c.res);

    },[getPublishedCollections]);

    useEffect(()=>{
        fetchPublishedCollections();
    },[]);

    return <div className="mx-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
    {
        collections?.map((c,i)=>{
            return <CollectionView collection={c} key={`coll_${i}`} setViewType={setViewType}/>
        })
    }
    </div> 
}