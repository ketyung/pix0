import { FC } from "react";
import { PFPCollectionForm } from "./PFPCollectionForm";

export const View : FC = () =>{

    return <div className="mt-10">
        <h2>Create Your Collection Here</h2>
        <PFPCollectionForm/>
    </div>
}