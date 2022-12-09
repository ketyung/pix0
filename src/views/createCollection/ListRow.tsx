import { FC} from "react";
import { dateToTimeAgo } from "../../utils";
import { Dropdown, DropdownItem } from "../components/Dropdown";
import { Collection } from "../../models/collection";
import { MoreIcon } from "../components/icons/MoreIcon";
import { Props } from "./List";
import useService from "../../hooks/useService";
import { statusItems } from "./HeaderForm";
import { ViewType } from "./View";

type RProps = Props & {

    collection? : Collection,

    index?: number,

    refreshList? : (refresh: boolean) => void, 
}

export const ListRow : FC <RProps> = ({
    index, collection, setViewType, refreshList
}) =>{

    const timeAgo = dateToTimeAgo(collection?.date_updated);

    const {deleteCollection} = useService();

    const remove = async () => {
        if (window.confirm("Are you to remove this?")) {

            if ( collection?._id ) {

                await deleteCollection(collection?._id, (e)=>{

                    if ( e instanceof Error){
                        window.alert(`Error: ${e.message}`);
                    }
                    else {

                        window.alert("Deleted!");
                        if (refreshList){
                            refreshList(true);
                        }
                    }
                });
            }
            
        }
    }

    const edit = () =>{

        if( setViewType ){

            setViewType({viewType : ViewType.EditCollection, param: collection?._id});
        }
    }


    const addMediaForm = () =>{

        if( setViewType ){

            setViewType({viewType : ViewType.AddMedia, param: collection});
        }
      
    }

    const addMinterGroup = () =>{

        if( setViewType ){

            setViewType({viewType : ViewType.AddMinterGroup, param: collection});
        }
      
    }


    const dropdownItems : DropdownItem[] = [
    {label:<><i className="fa fa-edit mr-2"/> Edit</>, action : edit},
    {label:<><i className="fa fa-remove mr-2"/> Remove?</>,action:remove},
    {label:<><i className="fa fa-plus mr-2"/> Add Images/Media</>,action:addMediaForm},
    {label:<><i className="fa fa-user mr-2"/> Add minter groups</>,action:addMinterGroup}];

    return <tr className="hover:bg-gray-200 hover:cursor-pointer p-4">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"20%",textAlign:"justify",
        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"80px"}}
        title={collection?.name}
        >{collection?.name}</td>
    <td title={collection?.description} style={{width:"20%",textAlign:"justify",
        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"120px"}}>{collection?.description}</td>
    <td className="pl-2 text-left">{statusItems.filter(s=>{return s.value === collection?.status})[0]?.name}</td>
    <td>{((collection?.media_count ?? 0) > 0) ? <a 
    title={`View media in the "${collection?.name}"`}
    className="text-blue-500" onClick={()=>{
        if( setViewType ){
            setViewType({viewType : ViewType.CollectionMedia, param: collection});
        }
    }}>{collection?.media_count}</a> : <>{collection?.media_count ?? 0}</>}</td>
    <td title={timeAgo.long} className="text-center">
    {timeAgo.short}</td>
    <td className="text-left ml-4">
        <Dropdown button={<MoreIcon 
        textColorClassName="text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full p-1"/>}
        items={dropdownItems} id={`rowdd_${index}`}/>
    </td>
  </tr>
}