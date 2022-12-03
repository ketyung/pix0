import { CollectionMedia } from "../../models/collection";
import { FC, useCallback, useEffect, useState } from "react";
import placeholder from '../../images/placeholder100.svg';



type Props = {

    media? : CollectionMedia,

    index? : number, 
}

export const IndMediaView : FC <Props> = ({
    media, index
}) =>{

    
    return <div className="flex-1 w-64 p-4 inline-block border-2 border-gray-200 m-4 
    rounded-2xl hover:bg-gray-200 hover:cursor-pointer">
       {(index ?? 0) +1}. {media &&
        <img src={media?.medias[0]?.data_url ? 
            Buffer.from(media.medias[0].data_url).toString('base64') :
        placeholder} placeholder={placeholder}
        className="object-scale-down h-64 w-64"/>} 
    </div>


}