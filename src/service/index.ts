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
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(collection) 
        });
        
        if ( completion) {

            let return_collection = (await response.json()) as Collection;
            completion( return_collection);
        }
    
    }
    catch(e : any ){

        if ( completion )
            completion( new Error(e.message));

    }
    
}


export const getCollectionsBy = async (creator : string, offset : number = 0, limit : number = 20 )
: Promise<Collection[]> =>{

    let url = `${REMOTE_URL}collections/${encodeURIComponent(creator)}/${offset}/${limit}`;
    
    try {

        let r = await ((await fetch(url))).json() as Collection[];
        return r;
    }
    catch (e : any) {

        console.error("error@getCollectionsBy", e);
        return [];
    }


}