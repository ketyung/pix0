import { FC, useEffect, useState, useCallback } from "react";
import useGenQuote from "../hooks/useGenQuote";

export const View : FC = () =>{

    const [imageDataURI, setImageDataURI] = useState<string>();

    const {generate} = useGenQuote();


    const genImage = useCallback(async ()=>{
        
        let s = await generate();
        setImageDataURI(s);
    },[generate]);

    useEffect(()=>{

        genImage();

    },[]);

    return <div className="flex items-center">
    <img src={imageDataURI} />
    </div>
}