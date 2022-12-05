import { FC, useState } from "react";
import useXrp from "../../hooks/useXrp";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { UploadField } from "../components/UploadField";
import { MessageView } from "../components/MessageView";
import { MetadataForm } from "./MetadataForm";
import { Message, MessageType, NFTMetadata } from "../../models";
import { Spinner } from "../components/Spinner";
import { uriExists } from "../../utils";

export const SimpleMintForm : FC = () =>{

    const [message, setMessage] = useState<Message>();

    const [processing, setProcessing] = useState(false);

    const [useUpload, setUseUpload] = useState(false);

    const [metadata, setMetadata] = useState<NFTMetadata>({});

    const [showMetadataForm, setShowMetadataForm] = useState(false);

    const [mediaURI, setMediaURI] = useState<string>();

    const [mediaDataUrl, setMediaDataUrl] = useState<{mediaDataUrl? : string,
        contentType?: string,fileName? : string, }>();

    const {mintNft} = useXrp();

    const setMediaCallback = (media: {
        mediaDataUrl? : string,
        contentType?: string,
        fileName? : string, }, _index? : number ) => {

        setMediaDataUrl(media);
    }


    const setMessageNow = (message : Message) => {

        setMessage(message);

        setTimeout(()=>{
            setMessage(undefined);
        },5000);
    }

    const mintNow = async () =>{

        setMessage(undefined);

        setProcessing(true);
    
        let params = { mediaURI : mediaURI, 
            dataUrl : mediaDataUrl?.mediaDataUrl,
            contentType : mediaDataUrl?.contentType, 
            isDataUrl : useUpload, 
            metadata : metadata,
            fee: 2, transferFee :undefined, isBurnable: true};

        await mintNft(params, (e)=>{

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

        setProcessing(false);
        
    }

    return <div className="m-auto p-10 mt-4 border-2 border-gray-200 rounded-3xl w-5/6 text-left">
        <h1 className="font-bold">Simple Mint</h1>
        You can mint an NFT by simply providing a media URL or upload an image/video etc below :
        {message && <MessageView message={message}/>}
        <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
            { useUpload ? <UploadField withImagePreview={true} setMediaCallback={setMediaCallback}/> :
            <TextField label="Media URI" id="mediaURI" type="text" placeholder="Media URI"
            className={commonTextfieldClassName('w-3/6')}
            onChange={(e)=>{
                setMediaURI(e.target.value);
            }}/>} 
            or<button 
            onClick={(e)=>{
                e.preventDefault();
                let useUpl = !useUpload;
                setUseUpload(useUpl);
                if (!useUpl){
                    setMediaDataUrl(undefined);
                }
            }}
            className="ml-2 bg-gray-500 text-gray-100 p-1 w-32 rounded-2xl">
            {useUpload? "input the URL?" : "upload a file?"}</button>
        </div>
        <div className="mb-4">
        <button style={{minWidth:"150px"}}
        className="shadow bg-gray-900 hover:bg-gray-700 w-64 rounded-3xl p-1 text-gray-100 mb-2" 
        type="button" disabled={processing} onClick={async ()=>{
            let sh = !showMetadataForm;
            setShowMetadataForm(sh);
            if ( !sh ){
                setMetadata({});
            }

        }}>
        { showMetadataForm ? <><i className="fa fa-minus mr-2"/>Remove Metadata</> :
         <><i className="fa fa-plus mr-2"/>Add Metadata</>}
        </button>
        </div>
        { showMetadataForm && <MetadataForm setMetadata={setMetadata} metadata={metadata}/>}
        <div className="mb-4">
        <button style={{minWidth:"150px"}}
        className="shadow bg-gray-800 hover:bg-purple-700 
        focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
        type="button" disabled={processing} onClick={async ()=>{
            await mintNow();
        }}>
        {processing ? <Spinner/> : <>Mint NFT (2 XRP)</>}
        </button>
        </div>
        </form> 
    </div>
}