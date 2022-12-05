import { FC, useEffect, useCallback, useState } from "react";
import useService from "../../hooks/useService";
import { Spinner } from "../components/Spinner";
import { Collection } from "../../models/collection";
import { ListRow } from "./ListRow";
import { ViewTypeAndParam } from "./View";

export type Props = {

    setViewType? : (viewType : ViewTypeAndParam) => void,

}

export const List : FC <Props> = ({
    setViewType
}) =>{

    const {getCollectionsBy, loading} = useService();

    const [collections, setCollections] = useState<Collection[]>([]);

    const fetchCollections = useCallback (async ()=>{

        let c = await getCollectionsBy();
        setCollections(c.res);

    },[getCollectionsBy]);

    useEffect(()=>{
        fetchCollections();
    },[]);

    return <div className="flex flex-col justify-center items-center p-2 z-20">
    <table className="table-auto m-2 shadow-2xl rounded" cellPadding={3} cellSpacing={3}>
    <thead>
      <tr className="bg-gray-300">
        <th style={{width:"5%"}}>No</th>
        <th style={{width:"20%"}} className="pl-2 text-left">Name</th>
        <th style={{width:"25%"}} className="pl-2 text-left text-ellipsis max-w-32">Description</th>
        <th style={{width:"10%"}} className="pl-2 text-left">Status</th>
        <th style={{width:"10%"}}>Media count</th>
        <th style={{width:"10%"}}>Date</th>
        <th style={{width:"8%"}} className="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
    {
        collections.map((c,i)=>{
            return <ListRow key={`coll_${i}`} collection={c} index={i} setViewType={setViewType}/>
        })
    }
    {loading ? <tr><td colSpan={6} className="p-10"><Spinner/></td></tr> : <></>}
    </tbody>
    </table></div>
}