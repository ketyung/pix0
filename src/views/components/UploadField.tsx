import { FC , useState } from "react";

type Props = {
    label? : string,
    
    id? : string,

    allowedFileTypes? : string[],
    
    maxFileSize? : number, 

    onError?: (error : Error) => void,
}


export const UploadField : FC <Props> = ({
    id, label, allowedFileTypes, maxFileSize, onError
}) =>{

    const [mediaDataUrl, setMediaDataUrl] = useState<string>();

    const [contentType, setContentType] = useState<string>();


    const checkIfFileValid = (file : any ) : boolean => {
        let aFileTypes = allowedFileTypes ?? ["image/png", "image/jpeg", "image/jpg"];

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


    const handleMediaDataUrl = async  (info : any ) =>{

        let file = info.file;

        if ( !checkIfFileValid(file)){
            return; 
        }

        let src = file.url;

        setContentType(file.type);
            
        if (!src && file.originFileObj) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();

            reader.readAsDataURL(file.originFileObj);

            reader.onload = () => { 
                if ( reader.result !== null && typeof reader.result === 'string' ) {
                    resolve(reader.result);
                }   
            };
        
          });
        }
    
        if ( src ) {
            setMediaDataUrl(src);   
        }
    }

    const onChange = async (info : any) =>{
        await handleMediaDataUrl(info);
    }


    return <> <label htmlFor={id} 
    className="form-label inline-block mb-2 text-gray-700">{label}</label>
    <input className="form-control
    block w-full px-3 py-1.5 text-base
    font-normal text-gray-700 bg-white bg-clip-padding
    border border-solid border-gray-300 rounded
    transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
    type="file" id={id} onChange={(e)=>{
        onChange(e);
    }}/>
    </>
}