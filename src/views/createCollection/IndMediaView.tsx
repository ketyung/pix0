import { CollectionMedia, MediaType } from "../../models/collection";
import { FC} from "react";
import placeholder from '../../images/placeholder100.svg';



type Props = {

    media? : CollectionMedia,

    index? : number, 
}

export const IndMediaView : FC <Props> = ({
    media, index
}) =>{


    const uriOrDataUrl = (_media? : CollectionMedia) =>{

        if (_media && _media?.medias?.length > 0 ) {

            if ( _media.medias[0].type === MediaType.media_uri){
            
                return _media?.medias[0]?.value ?
               _media?.medias[0]?.value 
                : placeholder;

            }
            else {

                return placeholder;
            }
        }
    }
    
    return <div className="flex-1 w-64 p-4 inline-block border-2 border-gray-200 m-4 
    rounded-2xl hover:bg-gray-200 hover:cursor-pointer">
       <div className="p-2 rounded-t-xl bg-gray-600 text-white">{(index ?? 0) +1}. 
       &nbsp;{media?.name}</div> 
       {media &&
        <img src={uriOrDataUrl(media)} placeholder={placeholder}
        className="object-scale-down h-64 w-64 bg-sky-100 p-2 rounded-b-xl"/>} 
    </div>


}