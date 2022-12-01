import { FC, useEffect, useCallback, useState } from "react";
import useService from "../../hooks/useService";
import { Spinner } from "../components/Spinner";
import { Collection } from "../../models/collection";
import { ListRow } from "./ListRow";

export const List : FC = () =>{

    const {getCollectionsBy, loading} = useService();

    const [collections, setCollections] = useState<Collection[]>([]);

    const fetchCollections = useCallback (async ()=>{

        let c = await getCollectionsBy();
        setCollections(c.res);

    },[getCollectionsBy]);

    useEffect(()=>{
        fetchCollections();
    },[]);

    return <div className="flex flex-col justify-center items-center p-2">
    <table className="table-auto m-2 shadow-2xl rounded" cellPadding={3} cellSpacing={3}>
    <thead>
      <tr className="bg-gray-300">
        <th style={{width:"5%"}}>No</th>
        <th style={{width:"25%"}} className="pl-2 text-left">Name</th>
        <th style={{width:"35%"}} className="pl-2 text-left">Description</th>
        <th style={{width:"10%"}}>No. of media</th>
        <th style={{width:"10%"}}>Date</th>
        <th style={{width:"10%"}}>Actions</th>
      </tr>
    </thead>
    <tbody>
    {
        collections.map((c,i)=>{
            return <ListRow key={`coll_${i}`} collection={c} index={i}/>
        })
    }
    {loading ? <tr><td colSpan={6} className="p-10"><Spinner/></td></tr> : <></>}
    </tbody>
    </table></div>
}