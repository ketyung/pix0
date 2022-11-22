import { v2 as cloudinary } from 'cloudinary';
import { CloudParam } from "../models";

const getAllCloudParams = () : CloudParam[]|undefined =>{

    let params = process.env.REACT_APP_CLOUDINARY_PARAMS;
    if ( params ){

        let prms = JSON.parse(params) as CloudParam[];
        return prms;
    }
}


export const randomInt = (min : number, max : number) =>{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); 
}


// refer here https://cloudinary.com/documentation/upload_images#example_2_upload_multiple_files_using_a_form_signed
export const uploadAll = () => {

    let prms = getAllCloudParams();
    if ( prms ){

        let prm = prms[ randomInt(0, prms.length -1)];
        const myconfig = cloudinary.config({
            cloud_name: prm.name,
            api_key: prm.api_key,
            api_secret: prm.secret,
            secure: true
        });

        const url = "https://api.cloudinary.com/v1_1/" + myconfig.cloud_name + "/auto/upload";
   
        const timestamp = Math.round((new Date).getTime()/1000);

        const signature = cloudinary.utils.api_sign_request({
          timestamp: timestamp,
          source: 'uw',
          folder: prm.upload_folder ?? ""}, myconfig.api_secret ?? "");
        
        if ( document !== null ) {

            const formData = new FormData();
    
            const files = (document.querySelector("[type=file]") as HTMLInputElement).files;
            if ( files !== null ) {

                for (let i = 0; i < files.length; i++) {

                    let file = files[i];
                    formData.append("file", file);
                    formData.append("api_key", myconfig.api_key ?? "");
                    formData.append("timestamp", timestamp+"");
                    formData.append("signature", signature);
                    formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
                    formData.append("folder", prm.upload_folder ?? "");
            
                    fetch(url, {
                        method: "POST",
                        body: formData
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        console.log(JSON.parse(data))
                        //var str = JSON.stringify(JSON.parse(data), null, 4);
                    });
                }
            }
            

        }
      
        
    }

}




