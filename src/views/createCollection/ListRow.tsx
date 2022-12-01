import { FC } from "react";
import { dateToTimeAgo } from "../../utils";
import { Collection } from "../../models/collection";

type Props = {

    collection? : Collection,

    index?: number,
}

export const ListRow : FC <Props> = ({
    index, collection
}) =>{

    const timeAgo = dateToTimeAgo(collection?.date_created);

    return <tr className="hover:bg-gray-200 hover:cursor-pointer">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"25%"}} className="pl-2 text-left text-ellipsis">{collection?.name}</td>
    <td className="pl-2 text-left text-ellipsis max-w-32">{collection?.description}</td>
    <td></td>
    <td title={timeAgo.long} className="text-left pl-10">
    {timeAgo.short}</td>
    <td><i className="fa fa-cog" aria-hidden="true"/></td>
  </tr>
}