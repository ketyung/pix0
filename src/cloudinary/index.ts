import { CloudParam } from "../models";
import { randomInt, shortenStringTo } from "../utils";
const CryptoJS = require('crypto-js');

export const singleUpload = async ( data_url : string,
    creator : string, 
    completion? : (res : Error| string) =>void) =>{

    let prms = getAllCloudParams();
    if ( prms ){

        let prm = prms[ randomInt(0, prms.length -1)];
      
        await singleUploadNow({data_url : data_url, cloudName : prm.name, api: prm.api_key,creator: creator,
        upload_folder : prm.upload_folder, secret_key : prm.secret},
            completion);
    }
    else {
        if ( completion){
            completion(new Error("Undefined cloud params!"));
        }
    }
}


// refer here 
// https://cloudinary.com/documentation/upload_images#manual_signature_generation
const shaSignature = ( api_key : string, folder : string ,pub_id : string, tags: string, secret_key : string ) =>{

    let tt = Date.now();
    let timestamp = Math.floor( tt / 1000);

    let pubid = `${pub_id}${tt}`;

    let s = `api_key=${api_key}&folder=${folder}&public_id=${pubid}&tags=${tags}timestamp=${timestamp}${secret_key}`;

    let ss = CryptoJS.SHA1(s).toString();

    let rt = {timestamp : `${timestamp}`, signature : ss, public_id : pubid, tags : tags,
    folder : folder , api_key : api_key};
    
    return rt; 
}


const singleUploadNow = async (param : {data_url : string, cloudName? : string, api? :string,
    creator? : string,  upload_folder? : string, secret_key? : string }, completion? : (res : Error| string) =>void   ) =>{

    try {

        const signData = shaSignature( param.api ?? "",
        param.upload_folder ?? "",    
        `${shortenStringTo(param.creator ?? "", 16, "")}`, 
        param.creator ?? "", 
        param.secret_key ?? "");
    

        var url = `https://api.cloudinary.com/v1_1/${param.cloudName}/upload`;

        //const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
   
        var fd = new FormData();
        fd.append("api_key", signData.api_key );
        fd.append("folder", signData.folder);
        fd.append('public_id', signData.public_id);
        fd.append('tags', signData.tags ); // Optional - add tag for image admin in Cloudinary
        fd.append("timestamp", signData.timestamp);
       
        fd.append("signature", signData.signature);
        fd.append('file', param.data_url);
       
       
        fetch(url, {
            method: "POST",
            body: fd
        })
        .then( async (response) => {
            
            if (response.status === 200 ){

                if (completion)
                    completion( ( await response.text()));
            }
            else {

                if ( completion ) {

                    completion(new Error(`Error ${response.status} : ${(await response.text())}`));
                }
            }
        })
        .catch((e) => {

            if (completion)
                completion(e);

        });
    }
    catch(e : any ) {

        if (completion) {

            completion( new Error(`Error : ${e.message}`));
        }
    }
}


const getAllCloudParams = () : CloudParam[]|undefined =>{

    let params = process.env.REACT_APP_CLOUDINARY_PARAMS;
    if ( params ){

        let prms = JSON.parse(params) as CloudParam[];
        return prms;
    }
}
