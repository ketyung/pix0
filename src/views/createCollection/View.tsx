import { FC } from "react";
//import { PFPCollectionForm } from "./PFPCollectionForm";
import { PFPCollectionHeaderForm } from "./PFPCollectionHeaderForm";
import { List } from "./List";

export const View : FC = () =>{

    return <div className="mt-10">
        <h2>Create Your Collection Here</h2>
        { /* <PFPCollectionHeaderForm/> */}
        <List/>
    </div>
}