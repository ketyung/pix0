import { FC } from "react";
import { Collection } from "../../models/collection";

type Props = {

    collection? : Collection,

    index?: number,
}

export const ListRow : FC <Props> = ({
    index, collection
}) =>{

    return <tr className="hover:bg-gray-200 hover:cursor-pointer">
    <td>{((index ?? 0) +1)}</td>
    <td style={{width:"25%"}} className="pl-2 text-left text-ellipsis">{collection?.name}</td>
    <td className="pl-2 text-left text-ellipsis max-w-32">{collection?.description}</td>
    <td></td>
    <td></td>
  </tr>
}