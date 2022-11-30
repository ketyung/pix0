import { FC, useState } from "react";
import { PFPCollectionFormRow } from "./PGPCollectionFormRow";
import { Collection, NEW_COLLECTION, MediaType, NEW_PFP_MEDIA } from "../../models/collection";

export const PFPCollectionForm : FC = () =>{

    const [collection, setCollection] = useState<Collection>(NEW_COLLECTION);
    

    return <div className="mt-10">
    {collection.media_list?.map((_e,i)=>{
        return <PFPCollectionFormRow key={`rowForm_${i}`} index={i}/>
    })
    }

    <button title="Add more" 
    className="text-sm ml-4 mt-2 p-2 w-32 font-bold ml-4 p-2 mb-2 
    bg-gray-900 rounded-full text-white" 
    onClick={()=>{
        let media_list = collection.media_list;
        media_list?.push(NEW_PFP_MEDIA);
        setCollection({...collection, media_list: media_list })
    }}><i className="fa fa-plus-circle" aria-hidden="true"/></button>
   

    </div>
}