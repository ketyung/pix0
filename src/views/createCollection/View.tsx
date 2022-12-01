import { FC, useState } from "react";
import { HeaderForm } from "./HeaderForm";
import { List } from "./List";

export enum ViewType {

    List,

    CreateCollection,
}



export const View : FC = () =>{


    const [viewType, setViewType] = useState<ViewType>();

    const switchView = () =>{

        if ( viewType) {

            switch(+viewType) {

                case ViewType.CreateCollection :
                    return <HeaderForm/>

                default :
                    return <List/>
            }
        }

        return <List/>
    }


    const buttonsView = <div className="mb-2 text-right mr-40">

        {viewType === ViewType.CreateCollection ?
        <button title="Cancel" 
        className="text-sm w-32 font-bold mb-4 mt-4 ml-4 p-2 mb-2 bg-gray-800 
        rounded-3xl text-white" onClick={()=>{
            setViewType(ViewType.List);
        }}><i className="fa fa-times" aria-hidden="true"/></button>
        
        :
        <button title="Create New Collection" 
        className="text-sm w-64 font-bold mb-4 mt-4 ml-4 p-2 mb-2 bg-gray-800 
        rounded-3xl text-white" onClick={()=>{
            setViewType(ViewType.CreateCollection);
        }}><i className="fa fa-plus mr-2" aria-hidden="true"/> Create New Collection</button>
        }
    </div>
        

    return <div className="mt-10 text-center">
        {buttonsView}
        { switchView()}
    </div>
}