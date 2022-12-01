import { Collection } from "../models/collection"

const REMOTE_URL = `${process.env.REACT_APP_SERVICE_API_URL ?? "http://localhost:3338/"}`;

export const addCollection = async  (collection : Collection,
    completion? : (res : Error|Collection) => void ) =>{

    let url = `${REMOTE_URL}add_collection/`; 

    try {

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
             
                'Content-Type': 'application/json',
                'access_token': process.env.REACT_APP_SERVICE_ACCESS_TOKEN ?? "", 
            },
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
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
             
                'Content-Type': 'application/json',
                'access_token': process.env.REACT_APP_SERVICE_ACCESS_TOKEN ?? "", 
            },
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
            headers: { 
                'Content-Type': 'application/json',
                'access_token': process.env.REACT_APP_SERVICE_ACCESS_TOKEN ?? "", 
            },
            
        }))).json() ;
        return c;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return { res :[] };
    }


}