import { FC } from "react";
import { PFPCollectionFormRow } from "./PGPCollectionFormRow";

export const PFPCollectionForm : FC = () =>{

    const rows = new Array(10).fill(1);

    return <div className="mt-10">
    {rows.map((i)=>{

        return <PFPCollectionFormRow index={i}/>
    })
    }

    </div>
}