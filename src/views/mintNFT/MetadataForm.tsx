import { FC } from "react";
import { NFTMetadata } from "../../models";
import { TextField } from "../components/TextField";

type Props = {

    metadata? : NFTMetadata,

    setMetadata? : ( data : NFTMetadata) => void,
}

export const MetadataForm : FC <Props> = ({
    metadata, setMetadata
}) =>{

    const setMetadataNow = (data : NFTMetadata) =>{

        if ( setMetadata) {

            setMetadata(data);
        }
    }

    return <div className="mt-2">
         <h2 className="font-bold">Additional Metadata for your NFT</h2>
         <div className="mb-4">
            <TextField id="name" label="Name" value={metadata?.name} onChange={(e)=>{
                setMetadataNow({...metadata, name: e.target.value});
            }}/>
         </div>

         <div className="mb-4">
            <TextField id="description" label="Description" value={metadata?.description} onChange={(e)=>{
                setMetadataNow({...metadata, description: e.target.value});
            }}/>
         </div>

         <div className="mb-4">
            <TextField id="ext_url" label="External URL" value={metadata?.external_url} onChange={(e)=>{
                setMetadataNow({...metadata, external_url: e.target.value});
            }}/>
         </div>

    </div>
}