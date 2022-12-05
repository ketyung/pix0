import { FC } from "react";
import { NFTMetadata } from "../../models";
import { Attribute } from "../../models/collection";
import { MediaAttribRow } from "../createCollection/MediaAttribRow";
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

    const addAttribute = () => {

        if ( metadata !== undefined) {

            let attrbs = metadata?.attributes;

            if (attrbs === undefined ){
                attrbs = [];
            }
    
            attrbs?.push({});
           
            setMetadataNow({...metadata, attributes : attrbs });
        }
    }

    const removeAttributeAt = (index? : number) => {

        if ( metadata ) {

            let attribs = metadata?.attributes;

            if (index !== undefined && attribs && attribs[index] !== undefined ) {
    
                attribs.splice(index, 1);
            }
            setMetadataNow({...metadata, attributes : attribs });
    
        }
    }

    const setAttributeAt = (attribute : Attribute, index? :number) => {

        if ( metadata ) {

            let attribs = metadata?.attributes;

            if (index !== undefined && attribs && attribs[index] !== undefined ) {
    
                attribs[index] = attribute;
            }
            setMetadataNow({...metadata, attributes : attribs });
    
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

        
         <div>
         <button title="Add Attributes/Traits" 
                className="text-sm min-w-32 font-bold ml-4 p-2 mb-2 bg-gray-900 rounded-3xl text-white" 
                onClick={(e)=>{
                    e.preventDefault();
                    addAttribute();
            }}><i className="fa fa-plus mr-2"/>Add Attributes/Traits</button> 

            {
                metadata?.attributes?.map((a,i)=>{

                    return <MediaAttribRow key={`attrb_${i}`} attribute={a} index={i} 
                    removeMediaAttributeAt={removeAttributeAt} setMediaAttributeAt={setAttributeAt}/>
                })
            }
         </div>

    </div>
}