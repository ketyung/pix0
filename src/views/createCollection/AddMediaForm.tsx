import { FC, useState, useEffect, useCallback } from "react";
import { UploadField } from "../components/UploadField";
import { MediaAttribRow } from "./MediaAttribRow";
import { MessageView } from "../components/MessageView";
import { Message, MessageType } from "../../models";
import { Spinner } from "../components/Spinner";
import useService from "../../hooks/useService";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { Collection, CollectionMedia, MediaType, Media, MediaAttribute } from "../../models/collection";

type Props = {

    collection? : Collection, 
}

export const AddMediaForm : FC <Props> = ({
    collection
}) =>{
    
    const [mediaDataUrl, setMediaDataUrl] = useState<string>();

    const [collectionMedia, setCollectionMedia] = useState<CollectionMedia>({
        medias: [], name : `${collection?.item_name_prefix ?? "Item"} #001`, collection_id : collection?.id ?? ""
    });

    const setMediaCallback = (media: {mediaDataUrl? : string,contentType?: string,
    fileName?: string }, _index? : number ) => {

        if ( media.mediaDataUrl ) {
            let medias = collectionMedia.medias;

            setMediaDataUrl(media.mediaDataUrl);

            medias[0]= {...medias[0], 
                layer_num : 0,
                layer_name : "image",
                type : MediaType.media_uri,
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
                layer_num : 0,
                layer_name : "image",
                type : MediaType.media_uri
            };

            media.attributes = [];
            media.attributes?.push({});
            
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

    const {addCollectionMedia, loading, getCollectionsMediaCountBy} = useService();

    const [message, setMessage] = useState<Message>();

    const setMessageNow = (message : Message) => {

        setMessage(message);
        setTimeout(()=>{
            setMessage(undefined);
        }, 5000);
    }

    const addMediaNow = async () =>{

        //console.log("collection.media@xx::", collectionMedia, new Date());
        if ( collection?.id ) {

            if (mediaDataUrl === undefined ){

                setMessageNow({text:"Please upload an image", type : MessageType.Error});
                return;
            }

            await addCollectionMedia(collectionMedia, collection?.id, 
                mediaDataUrl, (e)=>{

                setMediaDataUrl(undefined);

                if ( e instanceof Error) {

                    setMessageNow( {type: MessageType.Error, text : e.message});
                }
                else {
                    setMessageNow( {type: MessageType.Info, text : "Success"});
                }
            });
        }
       
    }


    const obtainNextItemName = useCallback(async ()=>{

        if ( collection?._id ) {

            let mediaCount = await getCollectionsMediaCountBy(collection?._id);
            
            let nextItemName = `${collection?.item_name_prefix ?? "Item"} #00${(mediaCount.count+1)}`;

            setCollectionMedia({...collectionMedia, name : nextItemName});
        }
    },[getCollectionsMediaCountBy]);

    useEffect(()=>{
        obtainNextItemName();
    },[]);

    return <div className="m-auto p-10 mt-4 border-2 border-gray-300 rounded-3xl w-5/6 text-center">
        <div className="mb-4">Add image to your collection <span className="font-bold">{
            collection?.name 
        }</span></div>
        {message && <MessageView message={message}/>}
         <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4 text-left">
        <div className="mb-4">
            <TextField label="Name" labelInline={true} 
            onChange={(e)=>{
                e.preventDefault();
                setCollectionMedia({...collectionMedia, name: e.target.value});
            }}
            value={collectionMedia.name }
            className={commonTextfieldClassName("w-72 inline-block ml-2")}/>
            <p className="text-xs text-red-800 mt-1"><i className="fa fa-info mr-2"/> Item name must be unique within the collection</p>
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
            <button title="Add media" disabled={loading}
            className="text-sm w-64 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={(e)=>{
                e.preventDefault();
                addMediaNow();
            }}>{loading ? <Spinner/> : <>Add Media</>}</button>
        </div>
        </form>
    </div>
}