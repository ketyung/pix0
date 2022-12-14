import { FC , useState} from "react";
import { List } from "./List";
import { NftDetailsView } from "./NftDetailsView";

export enum ViewType {

    List, 

    NftDetails,

}

export const View : FC = () =>{

    const [viewType, setViewType] = useState<{ viewType : ViewType, param? : any}>();

    const switchView = () =>{

        if ( viewType ) {

            switch(+viewType.viewType) {

                case ViewType.List :

                    return <List setViewType={setViewType}/>

                case ViewType.NftDetails :

                    return <NftDetailsView nftToken={viewType.param} setViewType={setViewType}/>
            
                default :
                    return <List setViewType={setViewType}/>


            }
        }
        else {

            return <List setViewType={setViewType}/>
        }
    }


    return <div className="mt-14">
        <h2 className="mt-4 font-bold">Your collectibles</h2>
        {switchView()}
    </div>
}