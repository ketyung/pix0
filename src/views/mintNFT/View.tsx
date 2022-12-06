import { FC, useState } from "react";
import { CollectionView } from "./CollectionView";
import { SimpleMintForm } from "./SimpleMintForm";

export enum ViewType {

    SimpleMint,

    CollectionsView, 

}

export const View : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>();

    const switchView = () =>{

        if ( viewType ){

            switch(+viewType){

                case ViewType.CollectionsView :

                    return <CollectionView/>

                case ViewType.SimpleMint :

                    return <SimpleMintForm/>
                default :

                    return infoView;
                
            }
        }
        else        
            return infoView;
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
    </>

    return <div className="mt-16 mx-auto text-center">
        <h1 className="font-bold mt-2">Mint your NFT</h1>
        {switchView()}
    </div>
}