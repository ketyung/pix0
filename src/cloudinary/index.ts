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


const shaSignature = (pub_id : string, secret_key : string ) =>{

    let timestamp = (new Date()).getTime();

    let pubid = `${pub_id}${timestamp}`;

    let s = `public_id=${pubid}&timestamp=${timestamp}${secret_key}`;

    let ss = CryptoJS.SHA1(s).toString();

    console.log("signtaure.is,", ss , s, new Date());
    return {timestamp : `${timestamp}`, signature : ss, public_id : pubid};

}


const singleUploadNow = async (param : {data_url : string, cloudName? : string, api? :string,
    creator? : string,  upload_folder? : string, secret_key? : string }, completion? : (res : Error| string) =>void   ) =>{

    try {

        const signData = shaSignature(`${shortenStringTo(param.creator ?? "", 16, "")}`, 
        param.secret_key ?? "");
    

        var url = `https://api.cloudinary.com/v1_1/${param.cloudName}/upload`;

        //const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
   
        console.log("upload.url::", url, new Date());
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        const unsignedUploadPreset = `upload-by-${param.creator}`;

        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // File uploaded successfully
                var response = JSON.parse(xhr.responseText);
                var url = response.secure_url;
                // Create a thumbnail of the uploaded image, with 150px width
                console.log("uploaded.url::", url, new Date());

                if ( completion)
                    completion(url);
            }
            else  {

                if ( completion )
                    completion(new Error(`Error ${xhr.status} : ${xhr.statusText}`));
            }
        }

        fd.append("timestamp", signData.timestamp);
        fd.append("signature", signData.signature);
       // fd.append('upload_preset', unsignedUploadPreset);
        fd.append("api_key", param.api ?? "");
        fd.append('tags', param.creator ?? ""); // Optional - add tag for image admin in Cloudinary
        fd.append('file', param.data_url);
        fd.append('public_id', signData.public_id);
        fd.append("folder", param.upload_folder ?? "");
    

        xhr.send(fd);
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
