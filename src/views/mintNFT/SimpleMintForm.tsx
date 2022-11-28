import { FC, useState } from "react";
import useXrp from "../../hooks/useXrp";
import { MessageView } from "../components/MessageView";
import { Message, MessageType } from "../../models";
import { Spinner } from "../components/Spinner";
import { uriExists } from "../../utils";

export const SimpleMintForm : FC = () =>{

    const [message, setMessage] = useState<Message>();

    const [processing, setProcessing] = useState(false);

    const [mediaURI, setMediaURI] = useState<string>();

    const {mintNft} = useXrp();


    const setMessageNow = (message : Message) => {

        setMessage(message);

        setTimeout(()=>{
            setMessage(undefined);
        },5000);
    }

    const mintNow = async () =>{

        setMessage(undefined);

        if (mediaURI){

            setProcessing(true);
            if ( await uriExists(mediaURI) ){
                await mintNft(mediaURI,2, undefined, true, (e)=>{

                    if ( e instanceof Error) {
                        setMessageNow ({
                            text: e.message,
                            type : MessageType.Error
                        });
                    }
                    else {

                        setMessageNow({
                            text: "Success!",
                            type: MessageType.Info,
                            hash : e, 
                        })
                    }
                    setProcessing(false);
      
                });
            }
            setProcessing(false);
        }
        else {

            setMessageNow ({
                text: "Invalid URI",
                type : MessageType.Error
            });

        }
    }

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
        <h1 className="font-bold">Simple Mint</h1>
        You can mint an NFT by simply providing a media URI or upload an image/video etc below :
        {message && <MessageView message={message}/>}
        <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mediaURI">
                Media URI
            </label>
            <input className="shadow appearance-none border rounded w-full 
            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="mediaURI" type="text" placeholder="Media URI"
            onChange={(e)=>{
                setMediaURI(e.target.value);
            }}/>
        </div>
        <div className="mb-4">
        <button style={{minWidth:"150px"}}
        className="shadow bg-gray-800 hover:bg-purple-700 
        focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
        type="button" disabled={processing} onClick={async ()=>{
            await mintNow();
        }}>
        {processing ? <Spinner/> : <>Mint NFT</>}
        </button>
        </div>
        </form> 
    </div>
}