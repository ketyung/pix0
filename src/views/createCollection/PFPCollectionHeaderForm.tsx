import { FC, useState } from "react";
import { TextField } from "../components/TextField";
import { Select } from "../components/Select";
import { Status, Collection } from "../../models/collection";



export const PFPCollectionHeaderForm : FC = () =>{

    const [collection, setCollection] = useState<Collection>({name : "", created_by: ""});

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
    <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mb-4 font-bold">
    Create Your Collection
    </div>
    <div className="mb-4">
        <TextField label="Name" labelInline={true} id="name" type="text" placeholder="Name"
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }}/>
    </div>
    <div className="mb-4">
        <TextField label="Description" labelInline={true} id="description" type="text" placeholder="Description"
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }}/>
    </div>
    <div className="mb-4">
        <Select items={[
            {value : Status.NEW, name : "New"},
            {value : Status.PUBLISHED, name : "Published"},
            {value : Status.DEACTIVATED, name : "Deactivated"},
    ]} firstItem={{name : "Status"}} id="status" onChange={(e)=>{
        setCollection({...collection, status : e.target.value});
    }}/>
    </div>
    

    </form>

    </div>
}