import { FC, useState } from "react";
import { PFPCollectionFormRow } from "./PGPCollectionFormRow";
import { Collection, NEW_COLLECTION } from "../../models/collection";

export const PFPCollectionForm : FC = () =>{

    const [collection, setCollection] = useState<Collection>(NEW_COLLECTION);
    

    return <div className="mt-10">
    {collection.media_list?.map((_e,i)=>{
        return <PFPCollectionFormRow key={`rowForm_${i}`} index={i}/>
    })
    }

    </div>
}