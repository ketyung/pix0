import { FC, useState, useCallback, useEffect } from "react";
import useService from "../../hooks/useService";
import { Collection } from "../../models/collection";
import { ViewType } from "./View";

export type Props = {

    collection?: Collection,

    setViewType? : (viewType : { viewType : ViewType, param?: any}) => void, 
}

export const CollectionView : FC <Props> = ({
    collection, setViewType
}) =>{

    const [media, setMedia] = useState<string>();

    const {getOneCollectionMedia} = useService();

    const fetchMedia = useCallback(async ()=>{

        let m = await getOneCollectionMedia(collection?.id ?? "");
        if ( m ){
            setMedia(m.medias[0].value);
        }

    },[getOneCollectionMedia]);

    useEffect(()=>{
        fetchMedia();
    },[]);


    return <div className="flex-1 mx-auto w-48 p-2 inline-block rounded-2xl 
    bg-gray-200 hover:bg-gray-300 hover:cursor-pointer mx-2"
    onClick={(e)=>{
        e.preventDefault();
        if ( setViewType )
            setViewType({viewType: ViewType.CollectionDetailsView, param: collection});
    }}>
        <div title={collection?.name} 
        className="mb-2 text-left pl-4 font-bold text-sm line-camp-2 w-100 line-clamp-1">{collection?.name}</div>
        {media && <div className="mb-2">
        <img src={media} className="object-scale-down h-64 w-64 bg-gray-100 p-2 pb-4 rounded-xl"/>
        </div>}

        { collection?.std_price &&
        <div className="mb-2 text-center mt-4 pl-4 font-bold w-100 rounded-xl bg-gray-600 p-2 text-gray-100">
        {collection?.std_price.toFixed(2)} XRP</div>}
       
        <div className="mb-2 text-left pl-4 line-clamp-1 w-100"
        title={collection?.description}>{collection?.description}</div>
    </div>
}