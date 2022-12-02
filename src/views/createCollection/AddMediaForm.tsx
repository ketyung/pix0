import { FC, useState } from "react";
import { UploadField } from "../components/UploadField";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { Collection, CollectionMedia, Media, MediaType } from "../../models/collection";


type Props = {

    collection? : Collection, 
}

export const AddMediaForm : FC <Props> = ({
    collection
}) =>{
    
    const [collectionMedia, setCollectionMedia] = useState<CollectionMedia>({
        layer_num:0, medias: [], 
    });

    return <div className="m-auto p-10 mt-4 border-2 border-gray-300 rounded-3xl w-5/6 text-center">
        <div className="mb-4">Add image to your collection <span className="font-bold">{
            collection?.name 
        }</span></div>
         <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4 text-left">
        <div className="mb-4">
            <TextField label="Name" labelInline={true} 
            onChange={(e)=>{
                e.preventDefault();
                setCollectionMedia({...collectionMedia, name: e.target.value});
            }}
            value={collectionMedia.name}
            className={commonTextfieldClassName("w-64 inline-block")}
            defaultValue={`${collection?.item_name_prefix} #001`}/>
        </div>
        <div className="mb-4">
            <UploadField label="Upload Image/Media" withImagePreview={true}/>
        </div>
       
        </form>
    </div>
}