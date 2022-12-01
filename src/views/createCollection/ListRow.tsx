import { FC } from "react";
import { dateToTimeAgo } from "../../utils";
import { Dropdown } from "../components/Dropdown";
import { Collection } from "../../models/collection";
import { Props } from "./List";
import { ViewType } from "./View";

type RProps = Props & {

    collection? : Collection,

    index?: number,
}

export const ListRow : FC <RProps> = ({
    index, collection, setViewType
}) =>{

    const timeAgo = dateToTimeAgo(collection?.date_created);

    const remove = () => {
        if (window.confirm("Are you to remove this?")) {

        }
    }

    const edit = () =>{

        if( setViewType ){

            setViewType({viewType : ViewType.EditCollection, param: collection?._id});
        }
    }

    return <tr className="hover:bg-gray-200 hover:cursor-pointer p-4">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"25%"}} className="pl-2 text-left text-ellipsis">{collection?.name}</td>
    <td className="pl-2 text-left text-ellipsis max-w-32">{collection?.description}</td>
    <td>{collection?.media_list?.length ?? 0}</td>
    <td title={timeAgo.long} className="text-left pl-10">
    {timeAgo.short}</td>
    <td>
        <Dropdown button={<i className="fa fa-cog" aria-hidden="true"/>}
        items={[{label:<><i className="fa fa-edit mr-2"/> Edit</>, action : edit},
        {label:<><i className="fa fa-remove mr-2"/> Remove?</>
        ,action:remove}]} id={`rowdd_${index}`}/>
        
    </td>
  </tr>
}