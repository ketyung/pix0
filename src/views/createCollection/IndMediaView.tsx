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


    const imgUri = (_media? : CollectionMedia) =>{

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
    
    return <div className="flex-1 w-48 p-2 inline-block hover:border-2 hover:border-gray-200 m-2 
    rounded-2xl hover:bg-gray-200 hover:cursor-pointer">
       <div className="p-2 rounded-t-xl bg-gray-600 text-white">{(index ?? 0) +1}. 
       &nbsp;{media?.name}</div> 
       {media &&
        <img src={imgUri(media)} placeholder={placeholder}
        className="object-scale-down h-64 w-64 bg-sky-100 p-2 pb-4 rounded-b-xl"/>} 
    </div>


}