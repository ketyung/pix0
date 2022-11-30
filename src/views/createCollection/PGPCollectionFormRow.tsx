import { UploadField } from "../components/UploadField";
import { FC } from "react";

type Props = {
    index? : number, 
}

export const PFPCollectionFormRow : FC <Props> = ({
    index
}) =>{


    const uploadAction = (media :{mediaUrl? : string, contentType? :string} )=>{
        
    }


    const onError = (error : Error) => {
        window.alert(error.message);
    }

    return <div className="mt-2">
        <span className="mr-2">{(index ?? 0) + 1}.</span>
        <UploadField id={`pfpRow_${index}`} onError={onError} 
        uploadAction={uploadAction}/>
    </div>
}