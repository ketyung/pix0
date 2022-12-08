import { AccountNFToken } from ".";

export enum OfferType {

    Sell,

    Buy,
}

export interface OfferCreator {

    pubkey? : string,

    classic_address? : string, 
}

export interface Offer {

    type : OfferType,

    offer_id : string, 

    nft_token : AccountNFToken,

    price? : number, 
    
    remark? : string, 

    start_date? : number, // in timestamp,

    end_date? : number, 

    created_by : OfferCreator,

    date_created? : Date, 
}

