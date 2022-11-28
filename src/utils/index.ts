import { NFTMetadata } from "../models";

export const shortenStringTo = (str : string, length : number = 32, strInBetween : string = "...") => {

    if ( str.length <= length){
        return str ;
    }

    const halfLen = length / 2;

	return (
		str.substring(0, halfLen) + (strInBetween ? strInBetween : "") + 
		str.substring(str.length - halfLen, str.length)
	);
};

export const copy = (copyText : string ) =>{
 
    navigator.clipboard.writeText(copyText);
}

export const uriExists = async  ( uri : string) : Promise<boolean> =>{
    let res = await fetch(uri);
    return res.status === 200;
}


export const fetchAsNFTMedata = async ( uri : string) : Promise<NFTMetadata|undefined> => {

    try {

        let json = await (await fetch(uri)).json() as NFTMetadata;
        return json;
    }
    catch(e : any) {

        //console.error("error@fetchAsJson@", e, new Date());
        return undefined;
    }
}