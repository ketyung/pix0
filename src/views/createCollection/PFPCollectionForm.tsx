import { FC } from "react";
import { UploadField } from "../components/UploadField";

export const PFPCollectionForm : FC = () =>{

    const onError = (error : Error) => {
        window.alert(error.message);
    }

    return <div>
    <UploadField id="upload1" onError={onError}/>
    </div>
}