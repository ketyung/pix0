import { FC, useEffect, useState, useCallback } from "react";
import { Props } from "./CollectionView";
import { Spinner } from "../components/Spinner";
import { MessageView } from "../components/MessageView";
import { Message, MessageType } from "../../models";
import useXrp from "../../hooks/useXrp";
import useService from "../../hooks/useService";


export const CollectionDetailsView : FC <Props> = ({
    collection, 
}) =>{

    const [media, setMedia] = useState<string>();

    const {getOneCollectionMedia} = useService();

    const [processing, setProcessing] = useState(false);

    const [message, setMessage] = useState<Message>();

    const fetchMedia = useCallback(async ()=>{

        let m = await getOneCollectionMedia(collection?.id ?? "");
        if ( m ){
            setMedia(m.medias[0].value);
        }

    },[getOneCollectionMedia]);

    const {randomMint} = useXrp();

    const setMessageNow = (message : Message) => {

        setMessage(message);
        setTimeout(()=>{
            setMessage(undefined);
        }, 5000);
    }


    useEffect(()=>{
        fetchMedia();
    },[]);

    const mintNow = async () => {

        if ( collection) {

            setProcessing(true);
            await randomMint(collection, (e)=>{

                if ( e instanceof Error){

                    setMessageNow({text : e.message, type : MessageType.Error});
                }
                else {

                    setMessageNow({text: "Success!", type: MessageType.Info, hash : e});
                }
                setProcessing(false);
            });
        }
       
    }

    return <div className="mt-10 text-center w-3/5 p-10 rounded-3xl 
    mx-auto bg-gray-100 hover:bg-gray-300 shadow-2xl">
        {message && <MessageView message={message}/>}
        <div title={collection?.name} 
        className="mb-2 text-left pl-1 font-bold text-lg w-100 line-clamp-1">{collection?.name}</div>
        <div className="mb-2 text-left pl-1 line-clamp-2 w-100 text-sm"
        title={collection?.description}>{collection?.description}</div>
        {media && <div className="mb-2">
        <img src={media} className="object-scale-down h-64 w-64 bg-gray-100 p-4 rounded-xl"/>
        </div>}

        { collection?.std_price &&
        <div className="mb-2 text-center mt-4 pl-4 font-bold w-100 rounded-3xl bg-gray-600 p-2 text-gray-100">
        <span className="text-center">Std Price : {collection?.std_price.toFixed(2)} XRP</span>
        <button className="ml-4 shadow bg-blue-800 hover:bg-purple-700 w-1/2 inline-block
        focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-3xl" 
        type="button" disabled={processing} onClick={async ()=>{
            await mintNow();
        }}>{processing ? <Spinner/> : <>Mint It!</>}</button>
       
        </div>}
       
        
       
      
    </div>
}