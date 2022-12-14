import { FC, useState } from "react";
import { HeaderForm } from "./HeaderForm";
import { List } from "./List";
import { AddMediaForm } from "./AddMediaForm";
import { CollectionMediaView } from "./CollectionMediaView";
import { MinterGroupForm } from "./MinterGroupForm";

export enum ViewType {

    List,

    CreateCollection,

    EditCollection,

    AddMedia,

    CollectionMedia,

    AddMinterGroup,

}

export interface ViewTypeAndParam {

    viewType : ViewType,

    param? : any, 
}


export const View : FC = () =>{


    const [viewType, setViewType] = useState<ViewTypeAndParam>();

    const switchView = () =>{

        let _vType = viewType?.viewType;
        if (_vType ) {

            switch(+_vType) {

                case ViewType.CreateCollection :
                    return <HeaderForm/>
                
                case ViewType.EditCollection :
                        return <HeaderForm toEdit={true} collectionId={viewType?.param}/>

                case ViewType.AddMedia :
                        return <AddMediaForm collection={viewType?.param}/>

                case ViewType.CollectionMedia :
                        return <CollectionMediaView collection={viewType?.param}/>
    
                case ViewType.AddMinterGroup :
                    return <MinterGroupForm collection={viewType?.param}/>
        
                default :
                    return <List setViewType={setViewType}/>
            }
        }

        return <List setViewType={setViewType}/>
    }


    const buttonsView = <div className="mb-2 text-right mr-40">

        {(viewType?.viewType !== ViewType.List && viewType?.viewType !== undefined) ?
        <button title="Cancel" 
        className="text-sm w-32 font-bold mb-4 mt-4 ml-4 p-2 mb-2 bg-gray-800 
        rounded-3xl text-white" onClick={()=>{
            setViewType({ viewType: ViewType.List});
        }}><i className="fa fa-times" aria-hidden="true"/></button>
        
        :
        <button title="Create New Collection" 
        className="text-sm w-64 font-bold mb-4 mt-4 ml-4 p-2 mb-2 bg-gray-800 
        rounded-3xl text-white" onClick={()=>{
            setViewType({viewType: ViewType.CreateCollection});
        }}><i className="fa fa-plus mr-2" aria-hidden="true"/> Create New Collection</button>
        }
    </div>
        

    return <div className="mt-10 text-center">
        {buttonsView}
        { switchView()}
    </div>
}