import { FC, useCallback, useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { ViewType } from "./View";
import { Spinner } from "../components/Spinner";
import { Collection } from "../../models/collection";
import { CollectionView } from "./CollectionView";


type Props = {

    setViewType? : (viewType : { viewType : ViewType, param?: any}) => void, 
}


export const PubCollectionsView : FC <Props> = ({
    setViewType
}) =>{

    const [collections, setCollections] = useState<Collection[]>();

    const [loading, setLoading] = useState(false);

    const {getPublishedCollections} = useService();

    const fetchPublishedCollections = useCallback(async ()=>{

        setLoading(true);
        let c = await getPublishedCollections();
        if ( c )
            setCollections(c.res);

        setLoading(false);

    },[getPublishedCollections]);

    useEffect(()=>{
        fetchPublishedCollections();
    },[]);

    return <div className="mx-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-center">
    { loading ? <div className="mt-10 w-32 mx-auto p-10 text-center mb-10"><Spinner/></div> :
        collections?.map((c,i)=>{
            return <CollectionView collection={c} key={`coll_${i}`} setViewType={setViewType}/>
        })
    }
    </div> 
}