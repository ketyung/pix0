import { FC, useState } from "react";
import { shortenStringTo } from "../../utils";
import { Spinner } from "../components/Spinner";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { AccountNFToken } from "../../models";

type Props = {
    nftToken? : AccountNFToken,

}
export const SaleForm : FC <Props> = ({
    nftToken
}) =>{

    const [ price, setPrice] = useState(1);

    const [processing,setProcessing] = useState(false);


    return <div className="mt-2 text-left" style={{minWidth:"600px"}}>
        <div className="mb-4">
        <span className="font-bold mr-2">Token ID:</span>
        <span title={nftToken?.NFTokenID}>{ shortenStringTo(nftToken?.NFTokenID ?? "", 24)}</span>  
        </div>
        <div className="mb-4">
        <TextField label="Price: " type="number" labelInline={true} 
        value={`${price}`}
        onChange={(e)=>{
            let p = parseFloat(e.target.value);
            if ( !isNaN(p))
                setPrice(p);
        
        }} className={commonTextfieldClassName('ml-2 w-64')}/><span className="ml-2 font-bold">XRP</span>
        </div>
        <div className="mb-4">
        <button title="Burn!!" disabled={processing}
        className="text-sm w-64 font-bold ml-4 text-2xl p-2 mb-2 bg-gray-800 rounded-3xl text-white" 
        onClick={async (e)=>{
            e.preventDefault();
            
        }}>{processing ? <Spinner/> : <><i className="fa fa-flag mr-2" aria-hidden="true"/>
        <span className="mr-6">Create</span></>}</button> 
        </div>
    
    </div>
 
}