import { Collection, CollectionMedia } from "../models/collection"

const REMOTE_URL = `${process.env.REACT_APP_SERVICE_API_URL ?? "http://localhost:3338/"}`;

const commonHeaders = {           
    'Content-Type': 'application/json',
    'access_token': process.env.REACT_APP_SERVICE_ACCESS_TOKEN ?? "", 
};


export const addCollection = async  (collection : Collection,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_collection/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:commonHeaders,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(collection) 
        });
        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion( {...collection, id: return_collection._id});
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}

export const updateCollection = async  (collection : Collection,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}update_collection/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            headers: commonHeaders,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(collection) 
        });
        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion( {...collection, id: return_collection._id});
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}



export const getCollectionsBy = async (creator : string, offset : number = 0, limit : number = 20 )
: Promise<{res : Collection[], total? :number , offset? : number, limit? : number}> =>{

    let url = `${REMOTE_URL}collections/${encodeURIComponent(creator)}/${offset}/${limit}`;
    
    try {

        let c = await ((await fetch(url,{
            headers:commonHeaders,
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { res :[] };
    }
}


export const getCollectionBy = async (creator : string, id : string )
: Promise<Collection|undefined> =>{

    let url = `${REMOTE_URL}collection_by/${encodeURIComponent(creator)}/${encodeURIComponent(id)}`;
    
    try {

        let c = await ((await fetch(url,{
            headers: commonHeaders,
        }))).json() ;

        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return undefined;
    }
}


export const addCollectionMedia = async  (
    media : {media : CollectionMedia,collection_id : string, creator : string},
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_collection_media/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:commonHeaders,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(media) 
        });
        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}


export const updateCollectionMedia = async  (
    media : {media : CollectionMedia,collection_id : string, creator : string},
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}update_collection_media/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers:commonHeaders,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(media) 
        });
        
        if ( completion) {

            let return_collection = (await response.json()) ;
            completion(return_collection);
      
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}