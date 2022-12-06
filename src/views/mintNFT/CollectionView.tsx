import { FC, useState, useCallback, useEffect } from "react";
import useService from "../../hooks/useService";
import { Collection } from "../../models/collection";

type Props = {

    collection?: Collection,
}

export const CollectionView : FC <Props> = ({
    collection
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
    bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
        <div className="mb-2 text-left pl-4 font-bold text-sm">{collection?.name}</div>
        {media && <div className="mb-2">
        <img src={media} className="object-scale-down h-64 w-64 bg-gray-100 p-2 pb-4 rounded-xl"/>
        </div>}
        <div className="mb-2 text-left pl-4">{collection?.description}</div>
    </div>
}