import { FC, useEffect, useState, useCallback } from "react";
import { generate } from "../konva/quoteGen";

export const View : FC = () =>{

    const [imageDataURI, setImageDataURI] = useState<string>();

    const genImage = useCallback(async ()=>{
        let imgSrc = "https://images.unsplash.com/photo-1586348943529-beaae6c28db9";

        let s = await generate({
            bgImageSrc : imgSrc,
        });

        setImageDataURI(s);

    },[]);

    useEffect(()=>{

        genImage();

    },[]);

    return <div className="flex items-center">
    <img src={imageDataURI} />
    </div>
}