import { FC } from "react";
import { UploadField } from "../components/UploadField";

export const PFPCollectionForm : FC = () =>{

    const onError = (error : Error) => {
        window.alert(error.message);
    }

    const uploadAction = (media :{mediaUrl? : string, contentType? :string} )=>{

    }

    return <div className="mt-10">
    <UploadField id="upload1" onError={onError}/>
    <button className="mt-4" onClick={()=>{
       
    }}></button>
    </div>
}