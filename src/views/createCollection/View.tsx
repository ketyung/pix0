import { FC } from "react";
//import { PFPCollectionForm } from "./PFPCollectionForm";
import { PFPCollectionHeaderForm } from "./PFPCollectionHeaderForm";

export const View : FC = () =>{

    return <div className="mt-10">
        <h2>Create Your Collection Here</h2>
        <PFPCollectionHeaderForm/>
    </div>
}