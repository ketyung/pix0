import { FC, useState } from "react";
import { PubCollectionsView } from "./PubCollectionsView";
import { SimpleMintForm } from "./SimpleMintForm";

export enum ViewType {

    SimpleMint,

    CollectionsView, 

    None,
}

export const View : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.None);

    const switchView = () =>{

        switch(+viewType){

            case ViewType.CollectionsView :

                return <PubCollectionsView/>

            case ViewType.SimpleMint :

                return <SimpleMintForm/>
            default :

                return infoView;
            
        }
            
    }

    const infoView = <>
       <div className="bg-white hover:bg-sky-200 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4 text-left w-4/5 mx-auto">
        Use <b>Simple Mint</b> to quickly mint a piece of art or image that you truly own into
        your wallet <button className="shadow bg-gray-800 hover:bg-purple-700 w-200 ml-4 mt-4
        focus:shadow-outline focus:outline-none text-white font-bold py-1 px-8 rounded"
        onClick={(e)=>{
            e.preventDefault();
            setViewType(ViewType.SimpleMint);
        }}>Let's Go</button>
    </div>

    <div className="bg-white hover:bg-sky-200 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-10 text-left w-4/5 mx-auto">
        Or mint from any collections in your neighborhood <button className="shadow bg-gray-800 hover:bg-purple-700 w-200 ml-4 mt-4
        focus:shadow-outline focus:outline-none text-white font-bold py-1 px-8 rounded"
        onClick={(e)=>{
            e.preventDefault();
            setViewType(ViewType.CollectionsView);
        }}>Let's Go</button>
    </div>
    </>

    return <div className="mt-16 mx-auto text-center">
        <h1 className="font-bold mt-2">Mint your NFT</h1>
        {(viewType !== ViewType.None) &&
        <button title="Cancel" 
        className="w-6 h-6 font-bold mb-4 mt-10 mr-32 pb-1 mb-2 bg-gray-800 
        rounded-3xl text-white float-right clear-both" onClick={()=>{
            setViewType(ViewType.None);
        }}><i className="fa fa-times" aria-hidden="true"/></button>}
        
        {switchView()}
    </div>
}