import { NFTMetadata, StoredWallet } from "../models";
import { decryptStoredWallet } from "./enc";

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

export const pubkeyOrAddress = (wallet? : StoredWallet, _type : string = "address" ) => {

    if (_type === "pubkey")
    {
        return wallet?.pubkey ?? "";
    }

    if ( wallet ) {
        let w = decryptStoredWallet(wallet);
   
        return w.classicAddress;
    }

    return "";
 
}
