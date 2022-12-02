import { FC } from "react";
import { Collection } from "../../models/collection";

type Props = {

    collection? : Collection, 
}

export const AddMediaForm : FC <Props> = ({
    collection
}) =>{
    

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
        <div className="mb-4">Add image to your collection <span className="font-bold">{
            collection?.name 
        }</span></div>
    </div>
}