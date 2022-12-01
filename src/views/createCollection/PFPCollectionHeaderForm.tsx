import { FC, useState } from "react";
import { TextField } from "../components/TextField";
import { Select } from "../components/Select";
import { Spinner } from "../components/Spinner";
import { Message, MessageType } from "../../models";
import { MessageView } from "../components/MessageView";
import { Status, Collection } from "../../models/collection";
import useService from "../../hooks/useService";



export const PFPCollectionHeaderForm : FC = () =>{

    const [collection, setCollection] = useState<Collection>({name : "", created_by: ""});

    const [message, setMessage] = useState<Message>();

    const {addCollection, loading} = useService();


    const setMessageNow = (message : Message) => {

        setMessage(message);
        setTimeout(()=>{
            setMessage(undefined);
        }, 5000);
    }

    const addCollectionNow = async () => {

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

        await addCollection(collection, (e)=>{

            if (e instanceof Error) {

                setMessageNow({ text : `Error: ${e.message}`, type : MessageType.Error});
            }
            else {
                setMessageNow({ text : "Success", type : MessageType.Info});
                console.log("res::", e, new Date());
            }
        });
    }


    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
    <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    {message && <MessageView message={message}/>}
    <div className="mt-2 mb-4 font-bold">
    Create Your Collection
    </div>
    <div className="mb-4">
        <TextField label="Name" labelInline={true} id="name" type="text" placeholder="Name"
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }}/>
    </div>
    <div className="mb-4">
        <TextField label="Description" labelInline={true} id="description" type="text" placeholder="Description"
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }}/>
    </div>
    <div className="mb-4">
        <Select items={[
            {value : Status.NEW, name : "New"},
            {value : Status.PUBLISHED, name : "Published"},
            {value : Status.DEACTIVATED, name : "Deactivated"},
    ]} firstItem={{name : "Status", value: "-"}} id="status" onChange={(e)=>{
        setCollection({...collection, status : e.target.value});
    }}/>
    </div>
    <div className="mt-2">
    <button title="Create Collection" disabled={loading} 
    className="text-sm min-w-32 font-bold p-2 mb-2 bg-gray-500 rounded text-white" 
    onClick={async (e)=>{
        e.preventDefault();
        await addCollectionNow();
    }}>{loading ? <Spinner/>  : <>Create Collection</>}</button>
    </div> 

    </form>

    </div>
}