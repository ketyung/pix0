import { CloudParam } from "../models";
import { randomInt } from "../utils";



export const singleUpload = ( data_url : string,
    creator : string, 
    completion? : (res : Error| string) =>void) =>{

    let prms = getAllCloudParams();
    if ( prms ){

        let prm = prms[ randomInt(0, prms.length -1)];
      
        singleUploadNow({data_url : data_url, cloudName : prm.name, api: prm.api_key,creator: creator,
        upload_folder : prm.upload_folder},
            completion);
    }
    else {
        if ( completion){
            completion(new Error("Undefined cloud params!"));
        }
    }
}


const singleUploadNow = (param : {data_url : string, cloudName? : string, api? :string,
    creator? : string,  upload_folder? : string }, completion? : (res : Error| string) =>void   ) =>{

    try {

        var url = `https://api.cloudinary.com/v1_1/${param.cloudName}/upload`;

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
            else if ( xhr.status === 400) {

                if ( completion )
                    completion(new Error(`Error 400! ${xhr.statusText}`));
            }
        }

        fd.append('upload_preset', unsignedUploadPreset);
        fd.append("api_key", param.api ?? "");
        fd.append('tags', param.creator ?? ""); // Optional - add tag for image admin in Cloudinary
        fd.append('file', param.data_url);
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
