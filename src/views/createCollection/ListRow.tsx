import { FC, useEffect, useCallback, useState } from "react";
import { dateToTimeAgo } from "../../utils";
import { Dropdown, DropdownItem } from "../components/Dropdown";
import { Collection } from "../../models/collection";
import useService from "../../hooks/useService";
import { Props } from "./List";
import { ViewType } from "./View";
import { getCollectionsMediaCountBy } from "../../service";

type RProps = Props & {

    collection? : Collection,

    index?: number,
}

export const ListRow : FC <RProps> = ({
    index, collection, setViewType
}) =>{

    const timeAgo = dateToTimeAgo(collection?.date_updated);

    const remove = () => {
        if (window.confirm("Are you to remove this?")) {

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


    const dropdownItems : DropdownItem[] = [
    {label:<><i className="fa fa-edit mr-2"/> Edit</>, action : edit},
    {label:<><i className="fa fa-remove mr-2"/> Remove?</>,action:remove},
    {label:<><i className="fa fa-plus mr-2"/> Add Images/Media</>,action:addMediaForm}];


    const {getCollectionsMediaCountBy} = useService();

    const [mediaCount, setMediaCount] = useState<number>();

    const fetchMediaCount = useCallback(async ()=>{
        let c = await getCollectionsMediaCountBy(collection?._id ?? "");
        setMediaCount(c.count);
    },[getCollectionsMediaCountBy]);


    useEffect(()=>{
        fetchMediaCount();
    },[]);

    return <tr className="hover:bg-gray-200 hover:cursor-pointer p-4">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"25%"}} className="pl-2 text-left text-ellipsis">{collection?.name}</td>
    <td className="pl-2 text-left text-ellipsis max-w-32">{collection?.description}</td>
    <td>{mediaCount}</td>
    <td title={timeAgo.long} className="text-center">
    {timeAgo.short}</td>
    <td>
        <Dropdown button={<i className="fa fa-cog" aria-hidden="true"/>}
        items={dropdownItems} id={`rowdd_${index}`}/>
    </td>
  </tr>
}