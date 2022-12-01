import { FC, useState, useEffect, useCallback } from "react";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { Select } from "../components/Select";
import { Spinner } from "../components/Spinner";
import { Message, MessageType } from "../../models";
import { MessageView } from "../components/MessageView";
import { Status, Collection } from "../../models/collection";
import useService from "../../hooks/useService";

type Props = {

    collectionId? : string,

    toEdit? : boolean,
}

export const HeaderForm : FC <Props> = ({
    collectionId, toEdit
}) =>{

    const [collection, setCollection] = useState<Collection>({name : "", created_by: ""});

    const [isEditMode, setIsEditMode] = useState(false);

    const [message, setMessage] = useState<Message>();

    const {addCollection, loading, updateCollection, getCollectionBy} = useService();


    const fetchCollectionForEdit = useCallback(async ()=>{

        console.log("id::", collectionId, new Date());
        if ( collectionId && toEdit ){

            let c = await getCollectionBy(collectionId);
            if ( c)
                setCollection(c);

        } 

    },[getCollectionBy]);


    useEffect(()=>{

        if ( toEdit ) {
            setIsEditMode(true);
            fetchCollectionForEdit();
        }
    },[toEdit]);

    const setMessageNow = (message : Message) => {

        setMessage(message);
        setTimeout(()=>{
            setMessage(undefined);
        }, 5000);
    }

    const saveCollectionNow = async () => {

        setMessage(undefined);

        if ( collection.name.trim() === "") {

            setMessageNow({
                text : "Name is blank!",
                type : MessageType.Error,
            });
            return; 
        }

        if (collection.status === undefined || collection.status?.trim() === "-") {

            
            setMessageNow({
                text : "Please choose a status for the collection!",
                type : MessageType.Error,
            });
            return; 
        }

        if ( isEditMode ) {


            await updateCollection(collection, (e)=>{

                if (e instanceof Error) {
    
                    setMessageNow({ text : `Error: ${e.message}`, type : MessageType.Error});
                }
                else {
                    setMessageNow({ text : "Success", type : MessageType.Info});
                    setCollection(e);
                }
            });
        }
        else {

            await addCollection(collection, (e)=>{

                if (e instanceof Error) {
    
                    setMessageNow({ text : `Error: ${e.message}`, type : MessageType.Error});
                }
                else {
                    setMessageNow({ text : "Success", type : MessageType.Info});
                    setCollection(e);
                    setIsEditMode(true);
                }
            });
        }
        
    }


    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
    <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    {message && <MessageView message={message}/>}
    <div className="mt-2 mb-4 font-bold">
    {isEditMode ? "Update" : "Create"} Your Collection
    </div>
    <div className="mb-4">
        <TextField label="Name" labelInline={true} id="name" type="text" placeholder="Name"
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }} defaultValue={collection.name}/>
    </div>
    <div className="mb-4">
        <TextField label="Description" labelInline={true} id="description" type="text" placeholder="Description"
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }} defaultValue={collection.description}/>
    </div>
    <div className="mb-4">
        <Select items={[
            {value : Status.NEW, name : "New"},
            {value : Status.PUBLISHED, name : "Published"},
            {value : Status.DEACTIVATED, name : "Deactivated"},
    ]} firstItem={{name : "Status", value: "-"}} id="status" onChange={(e)=>{
        setCollection({...collection, status : e.target.value});
    }}/>

    <div className="inline ml-2 text-right">
    <TextField label="Item Name Prefix" defaultValue={collection.item_name_prefix}
    className={commonTextfieldClassName("w-64 ml-4 inline-block")}
    labelInline={true} id="name" type="text" placeholder="Item name prefix"
        onChange={(e)=>{
            setCollection({...collection, item_name_prefix : e.target.value});
        }}/>
    {/*<div className="inline text-xs mt-1 break-words"
    style={{maxWidth:"200px"}}>This will be useful, e.g. if you have a collection of Helmets, 
        which the item has a name prefix "Helmet" followed by a number e.g. Helmet #001, Helmet #002 etc</div>
        */}
    </div> 
    </div>
    <div className="mt-2">
    <button title="Create Collection" disabled={loading} 
    className="text-sm w-64 font-bold p-2 mb-2 bg-gray-800 rounded text-white" 
    onClick={async (e)=>{
        e.preventDefault();
        await saveCollectionNow();
    }}>{loading ? <Spinner/>  : <>{isEditMode ? "Update" : "Create"} Collection</>}</button>
    </div> 

    </form>

    </div>
}