import { Collection } from "../../models/collection";
import { MinterGroup } from "../../models/collection";
import { Spinner } from "../components/Spinner";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { FC, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type Props = {

    collection? : Collection, 
}

export const MinterGroupForm : FC <Props> = ({
    collection
}) =>{

    const [group, setGroup] = useState<MinterGroup>({name : "", collection_id : collection?.id ?? ""});

    const [loading, setLoading] = useState(false);

    return <div className="m-auto p-10 mt-4 border-1 border-gray-300 rounded-3xl w-3/5 shadow-2xl text-left">
          <div className="mb-4">Add a minter group (such as WhiteList, OG etc) in your collection <span className="font-bold">{
            collection?.name 
        }</span><span className="ml-4 text-red-500">Coming soon...</span></div>    
        <div className="mb-4">
            <TextField label="Name" id="name" onChange={(e)=>{
                setGroup({...group, name : e.target.value});
            }} placeholder="e.g. OG, White List etc"
            value={group.name }
            className={commonTextfieldClassName("w-72 inline-block ml-2")}/>
        </div>
        <div className="mb-4">
            <TextField label="Description" id="description" 
            onChange={(e)=>{
                setGroup({...group, description : e.target.value});
            }}
            value={group.description }/>
        </div>
        <div className="mb-4">
            <TextField label="Mint Price" id="price" type="number"
            onChange={(e)=>{
                setGroup({...group, mint_price : parseFloat(e.target.value)});
            }} labelInline={true}
            value={`${group.mint_price ?? ""}`}
            className={commonTextfieldClassName("w-32 inline-block ml-2")}/><span className="ml-2 font-bold">XRP</span>
        </div>
        <div className="mb-4">
            <TextField label="Max Per Wallet" id="maxPerWallet" type="number"
            onChange={(e)=>{
                setGroup({...group, max_per_wallet : parseInt(e.target.value)});
            }} labelInline={true}
            value={`${group.max_per_wallet ?? 1}`}
            className={commonTextfieldClassName("w-32 inline-block ml-2")}/><span className="ml-2 font-bold">XRP</span>
        </div>

        <div className="mb-4">
        <b className="text-sm">Start and end dates</b>
        <Datepicker value={{startDate : group.start_date ? new Date(group.start_date)
        : new Date(), endDate : group.end_date ? new Date(group.end_date) : new Date()}}
        primaryColor="blue" showShortcuts={true} 
        onChange={(e)=>{

            setGroup({...group, start_date : ( e?.startDate && typeof e?.startDate === 'string') 
            ? new Date(e?.startDate).getTime() : 0,
            end_date : ( e?.endDate && typeof e?.endDate === 'string') ? 
            new Date(e?.endDate).getTime() : 0});     
        }}
        />
        </div>
        
        <div className="mt-2">
            <button title="Add minter group" disabled={loading}
            className="text-sm w-64 font-bold p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={(e)=>{
                e.preventDefault();
                window.alert("This feature will be coming soon...");
            }}>{loading ? <Spinner/> : <>Add</>}</button>
        </div>
    </div>;
}