import { FC, useEffect, useState, useCallback } from "react";
import { Props } from "./CollectionView";
import useService from "../../hooks/useService";


export const CollectionDetailsView : FC <Props> = ({
    collection, 
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


    return <div className="mt-10 text-center w-3/5 p-10 rounded-3xl 
    mx-auto bg-gray-100 hover:bg-gray-300 shadow-2xl">

        <div title={collection?.name} 
        className="mb-2 text-left pl-4 font-bold text-lg line-camp-2 w-100 line-clamp-1">{collection?.name}</div>
        {media && <div className="mb-2">
        <img src={media} className="object-scale-down h-64 w-64 bg-gray-100 p-4 rounded-xl"/>
        </div>}

        { collection?.std_price &&
        <div className="mb-2 text-center mt-4 pl-4 font-bold w-100 rounded-xl bg-gray-600 p-2 text-gray-100">
        {collection?.std_price.toFixed(2)} XRP</div>}
       
        <div className="mb-2 text-left pl-4 line-clamp-1 w-100"
        title={collection?.description}>{collection?.description}</div>
    </div>
}