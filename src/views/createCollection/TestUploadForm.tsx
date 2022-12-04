import { FC, useState } from "react";
import { UploadField } from "../components/UploadField";
import { singleUpload } from "../../cloudinary";
import useWalletState from "../../hooks/useWalletState";

export const TestUploadForm : FC = () =>{

    const [imageUrl, setImageUrl] = useState<string>();

    const [uploading, setUploading] = useState(false);

    const {selectedWalletPubkey} = useWalletState();

    const uploadAction = async (media: {
        mediaDataUrl? : string,
        contentType?: string,
    }) =>{
     
        if ( media.mediaDataUrl) {

            setUploading(true);
            let e = await singleUpload(media.mediaDataUrl, selectedWalletPubkey ?? "xxxx0");
            
            if (e instanceof Error){
                window.alert(e.message);
            }
            else {
                setImageUrl(e);
            }
            setUploading(false);
        
        }
        else {
            window.alert("Undefined media data url");
        }
       
    }

    return <div>
        <h2>Test Upload</h2>
        <div className="mb-2"><UploadField uploadAction={uploadAction} uploading={uploading}/></div>
        <div className="mt-2">
        {imageUrl && <img src={imageUrl} />}
        </div>
    </div>
}