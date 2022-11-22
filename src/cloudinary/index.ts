import { CloudParam } from "../models";

export const getAllCloudParams = () =>{

    let params = process.env.REACT_APP_CLOUDINARY_PARAMS;
    if ( params ){

        let prms = JSON.parse(params) as CloudParam[];
        prms.forEach((p,i)=>{
            console.log(i, ":", p);
        });
    }
    else {

        console.error("Null.params::",params);
    }

}