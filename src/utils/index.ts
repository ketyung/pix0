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
   
        return w?.classicAddress;
    }

    return "";
 
}


export function timeSince(date? : Date, short? : boolean ) : string | undefined {

	if ( date ){

		let now = new Date(); 

		let seconds : number = Math.floor((now.getTime() - date.getTime()) / 1000);
	  
		let interval : number = seconds / 31536000;
	  
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "Y" : " year" + ((interval >= 2) ? "s" : ""));
		}
		
        interval = seconds / 2592000;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "M" : " month" + ((interval >= 2) ? "s" : ""))
		}

		interval = seconds / 86400;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "D" : " day" + ((interval >= 2) ? "s" : ""));
		}
		interval = seconds / 3600;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "H" : " hour" + ((interval >= 2) ? "s" : ""));
		}

		interval = seconds / 60;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "m" : " minute" + ((interval >= 2) ? "s" : ""));
		}
		
        return Math.floor(seconds) + (short ? "s" : " second" + ((interval >= 2) ? "s" : ""));
	
	}
}


export function dateToTimeAgo(date?: Date): {short? : string, long? : string} {
	
	if ( date === undefined) return {short:"", long:""};

	let _date = date; 

	if (typeof date ==='string'){
		_date = new Date(date);
	}

	
	let timeAgo = timeSince(_date, true);
	let timeAgoLong = timeSince(_date);
	
	return { short : timeAgo , long : timeAgoLong + " ago"};

}