export enum Category {

    PFP_COLLECTION,

    NICE_QUOTE_COLLECTION,
}

export enum Status {

    PUBLISHED = 'P',

    NEW ='N', 

    DEACTIVATED = 'D',
}


export interface Collection {
    
    id? : string, 

    _id? : string,

    name : string , 

    description? : string,

    category? : Category,

    status? : Status,

    std_price? : number, 

    item_name_prefix? : string, 
  
    media_count? : number, 

    minter_group_count? : number, 

    burnable? : boolean,

    transferrable? : boolean,

    transfer_fee? : number, 
          
    created_by : string, 

    date_created? : Date,

    date_updated? : Date,
}


export interface MintInfo {

    minted? : boolean,

    minted_by? : string,

    date_minted : Date, 
}

export interface CollectionMedia {

    _id? : string,

    collection_id : string, 

    name : string, 

    created_by? : string, 

    max_num_of_media? : number, 
    
    medias : Media[],

    mint_info? : MintInfo,

    date_created? : Date,

    date_updated? : Date,

}


export enum MediaType {

    media_uri = 1 ,
    
    text = 2,

    shape = 3, 
}


export interface Media {

    type : MediaType,

    layer_num : number, 

    layer_name? : string,

    value? : string, // value can be uri or another JSON string
    // percentage of ocurrance
    poc? : number, 

    content_type? : string, 

    file_name? : string, 

    attributes?: Attribute[],    
}


export interface Attribute {

    trait_type? : string,

    value? : string,
    
    display_type? : string, 

}


export interface MinterGroup {

    name : string,

    collection_id : string, 

    description? : string,

    mint_price? : number, 

    start_date? : number, // store the date as unix timestamp

    end_date? : number, 

    max_per_wallet? : number, 

    date_created? : Date, 

    date_updated? : Date, 

}


export interface Minter {

    name? : string,

    wallet_address : string ,
    
    group_id : string , 
    
}