import { generate as genCode } from "../konva/quoteGen";



export default function useGenQuote()  {

    const generate = async () : Promise<string> =>{
        let imgSrc = "https://images.unsplash.com/photo-1586348943529-beaae6c28db9";

        let s = await genCode({
            bgImageSrc : imgSrc,
            quoteText : "SO what is it so cool just wanna test",
        });

        return s; 
    }

    return {generate} as const;

}