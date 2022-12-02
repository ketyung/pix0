import { FC, useState } from "react";
import { UploadField } from "../components/UploadField";
import { MediaAttribRow } from "./MediaAttribRow";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { Collection, CollectionMedia, MediaType, Media, MediaAttribute } from "../../models/collection";

type Props = {

    collection? : Collection, 
}

export const AddMediaForm : FC <Props> = ({
    collection
}) =>{
    
    const [collectionMedia, setCollectionMedia] = useState<CollectionMedia>({
        layer_num:0, medias: [], 
    });

    const setMediaCallback = (media: {mediaDataUrl? : string,contentType?: string,
    fileName?: string }, _index? : number ) => {

        if ( media.mediaDataUrl ) {
            let medias = collectionMedia.medias;

            const mediaBuffer = Buffer.from(media.mediaDataUrl, 'base64');
    
            medias[0]= {...medias[0], 
                type : MediaType.data_uri,
                data_url : mediaBuffer,
                content_type : media.contentType,   
                file_name : media.fileName, 
            };

            setCollectionMedia({...collectionMedia, medias: medias});

        }
    }

    const addMediaAttribute = () => {

        let medias = collectionMedia.medias;
        if (medias === undefined || medias.length === 0 ){
            medias = [];
            let media : Media = {
                type : MediaType.data_uri
            };

            media.attributes = [];

            medias.push (media);
        }
        else {

            let media = collectionMedia.medias[0];
            if ( media.attributes === undefined ){
                media.attributes = [];
            }

            media.attributes?.push({});
            medias[0] = media;
        }

        setCollectionMedia({...collectionMedia, medias: medias});
    }

    const setMediaAttributeAt = (attribute : MediaAttribute, index? :number) => {

        let medias = collectionMedia.medias;
        let media = medias[0];

        if (index !== undefined && media?.attributes && media?.attributes[index] !== undefined ) {

            media.attributes[index] = attribute;
        }  

        medias[0] = media;
        setCollectionMedia({...collectionMedia, medias: medias});
    }

    const removeMediaAttributeAt = (index? : number) => {

        let medias = collectionMedia.medias;
        let media = medias[0];

        if (index !== undefined && media?.attributes && media?.attributes[index] !== undefined ) {

            media.attributes.splice(index, 1);
        }
        medias[0] = media;
        setCollectionMedia({...collectionMedia, medias: medias});

    }

    const addMediaNow = () =>{

        console.log("collection.media@xx::", collectionMedia, new Date());
    }


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
            <UploadField label="Upload Image/Media" withImagePreview={true}
            setMediaCallback={setMediaCallback}/>
        </div>
        <div className="mb-4">
            <div className="text-left">
            <button title="Add Attributes/Traits" 
                className="text-sm min-w-32 font-bold ml-4 p-2 mb-2 bg-gray-900 rounded-3xl text-white" 
                onClick={(e)=>{
                    e.preventDefault();
                    addMediaAttribute();
                }}><i className="fa fa-plus mr-2"/>Add Attributes/Traits</button> 
            {

                collectionMedia.medias[0]?.attributes?.map((a,i)=>{
                    
                    return <MediaAttribRow index={i} attribute={a} key={`attrib_${i}`} 
                    setMediaAttributeAt={setMediaAttributeAt} removeMediaAttributeAt={removeMediaAttributeAt}/>
                })
            }
            </div>
        </div>

        <div className="mt-2">
            <button title="Add media" 
            className="text-sm min-w-32 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={(e)=>{
                e.preventDefault();
                addMediaNow();
            }}>Add Media</button>
        </div>
        </form>
    </div>
}