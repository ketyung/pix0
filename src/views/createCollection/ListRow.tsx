import { FC } from "react";
import { dateToTimeAgo } from "../../utils";
import { Dropdown } from "../components/Dropdown";
import { Collection } from "../../models/collection";

type Props = {

    collection? : Collection,

    index?: number,
}

export const ListRow : FC <Props> = ({
    index, collection
}) =>{

    const timeAgo = dateToTimeAgo(collection?.date_created);

    return <tr className="hover:bg-gray-200 hover:cursor-pointer p-4">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"25%"}} className="pl-2 text-left text-ellipsis">{collection?.name}</td>
    <td className="pl-2 text-left text-ellipsis max-w-32">{collection?.description}</td>
    <td></td>
    <td title={timeAgo.long} className="text-left pl-10">
    {timeAgo.short}</td>
    <td>
        <Dropdown button={<i className="fa fa-cog" aria-hidden="true"/>}
        items={[{label:<><i className="fa fa-edit mr-2"/> Edit</>},
        {label:<><i className="fa fa-remove mr-2"/> Remove?</>}]} id={`rowdd_${index}`}/>
        
    </td>
  </tr>
}