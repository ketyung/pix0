import { FC } from "react";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { AccountNFToken } from "../../models";

type Props = {
    nftToken? : AccountNFToken,
}
export const SaleForm : FC <Props> = ({
    nftToken
}) =>{

    return <div className="mt-2" style={{minWidth:"600px"}}>
        <div className="mb-4">
        <TextField label="Price" type="number" labelInline={true} onChange={(e)=>{
            
        }} className={commonTextfieldClassName('ml-2 w-64')}/><span className="ml-2 font-bold">XRP</span>
        </div>
    </div>

}