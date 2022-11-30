import { Spinner } from "./Spinner";
import { FC , useState} from "react";
import placeholder from '../../images/placeholder100.svg';

type Props = {
    label? : string,
    
    id? : string,

    allowedFileTypes? : string[],
    
    maxFileSize? : number, 

    onError?: (error : Error) => void,

    uploadAction? : (media: {
        mediaDataUrl? : string,
        contentType?: string,
    }) => void, 

    uploading? : boolean,

    withImagePreview? : boolean,

    setMediaCallback? : (media: {
        mediaDataUrl? : string,
        contentType?: string,
    }, index? : number ) => void, 

    index? : number 
}


export const UploadField : FC <Props> = ({
    id, label, allowedFileTypes, 
    maxFileSize, onError, uploadAction, 
    uploading, withImagePreview, setMediaCallback, index 
}) =>{

    const [mediaDataUrl, setMediaDataUrl] = useState<string>();

    const [contentType, setContentType] = useState<string>();


    const checkIfFileValid = (file : any ) : boolean => {

        if ( file === undefined) {

            if ( onError) {
                onError( new Error("File is undefined!"));
                return false;
            }
        }
        let aFileTypes = allowedFileTypes ?? ["image/png", "image/jpeg", "image/jpg", "image/gif"/*,"video/mp4"*/];

        const isValid = aFileTypes.indexOf(file.type) !== -1  ;
      
        if (!isValid ) {

            if ( onError) {
                onError( new Error(`Invalid file type ${file.type}`));
                return false;
            }
        }
      
        let allowedMax = (maxFileSize ?? 2*1024*1024);
        const isLtAllowed = file.size < allowedMax;
      
        if (!isLtAllowed) {
       
            if ( onError) {
                onError( new Error(`File size ${file.size} has exceeded max ${allowedMax}`));
                return false;
            }
       
        }
      
        let b = (isValid && isLtAllowed);

        return b;
    }


    const handleMediaDataUrl = async  (file : any ) =>{

        if (file === undefined) 
            return;

        if (!checkIfFileValid(file)){            
            return; 
        }

        setContentType(file.type);
            
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // convert image file to base64 string
            let res = reader.result;
            if ( typeof res === 'string') {
                setMediaDataUrlNow(res);
            }
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }    
    }

    const setMediaDataUrlNow = (dataUrl? : string) =>{

        setMediaDataUrl(dataUrl);
        if ( setMediaCallback) {
            setMediaCallback({mediaDataUrl : dataUrl, contentType: contentType}, index);
        }
    }

   
    const onChange = async () =>{

        if ( document !== null) {

            const selectedFileInput = document.getElementById(id ?? "fileInput") as any;
            let selectedFile = selectedFileInput.files[0];
            await handleMediaDataUrl(selectedFile);
    
        }
      
    }


    return <div className="hover:bg-gray-300 hover:cursor-pointer inline-block p-2">
    <div className="inline-block">{label &&<label htmlFor={id ?? "fileInput"} 
    className="form-label inline-block mb-2 text-gray-700">{label}</label>}
    <input className="form-control inline w-full px-3 py-1.5 text-base
    font-normal text-gray-700 bg-white bg-clip-padding
    border border-solid border-gray-300 rounded
    transition ease-in-out m-0 focus:text-gray-700 
    focus:bg-white focus:border-blue-600 focus:outline-none" 
    type="file" id={id ?? "fileInput"} onChange={ ()=>{
        onChange();
    }} onClick={()=>{
        setMediaDataUrl(undefined);
        setContentType(undefined);
    }}/>
    </div>
    {uploadAction && <>
    <button title="Upload..." disabled={uploading} 
    className={`text-sm ml-4 p-2 min-w-32 font-bold ml-4 p-2 mb-2 
    bg-gray-500 rounded-3xl text-white ${(mediaDataUrl ? 'opacity-100' : 'opacity-0')}`} 
    onClick={()=>{
        uploadAction({mediaDataUrl: mediaDataUrl, contentType : contentType});
    }}>{uploading ? <Spinner/> : 
    <><i className="fa fa-cloud-upload mr-2" aria-hidden="true"/>Upload</>}</button>

    <button title="Cancel" disabled={uploading} 
    className={`text-sm ml-4 p-2 min-w-32 font-bold ml-4 p-2 mb-2 
    bg-red-900 rounded-3xl text-white ${(mediaDataUrl ? 'opacity-100' : 'opacity-0')}`} 
    onClick={()=>{
        setMediaDataUrl(undefined);
        setContentType(undefined);
    }}> 
    <i className="fa fa-times" aria-hidden="true"/>Cancel</button></>}
    { withImagePreview  && <img id={`img_${id}`} placeholder={placeholder}
    className="ml-2 object-scale-down w-14 h-14 inline-block" src={mediaDataUrl ?? placeholder} />}
    </div>
    
}