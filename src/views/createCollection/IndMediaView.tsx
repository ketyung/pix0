import { CollectionMedia, MediaType } from "../../models/collection";
import { FC} from "react";
import { DropdownItem, Dropdown } from "../components/Dropdown";
import { MoreIcon } from "../components/icons/MoreIcon";
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

    const dropdownItems : DropdownItem[] = [
        {label:<><i className="fa fa-edit mr-2"/> Edit</>, action : undefined},
        {label:<><i className="fa fa-remove mr-2"/> Remove?</>,action: undefined}];
    
    
    
    return <div className="flex-1 w-48 p-2 inline-block 
    rounded-2xl hover:bg-gray-300 hover:cursor-pointer">
       <div className="p-2 rounded-t-xl bg-gray-600 text-white">{(index ?? 0) +1}. 
       &nbsp;{media?.name} <Dropdown button={<MoreIcon 
        textColorClassName="ml-2 text-gray-900 bg-gray-100 hover:bg-gray-300 rounded-full"/>}
        items={dropdownItems} id={`rowdd_${index}`}/></div> 
       {media &&
        <img src={imgUri(media)} placeholder={placeholder}
        className="object-scale-down h-64 w-64 bg-gray-200 p-2 pb-4 rounded-b-xl"/>} 
    </div>


}