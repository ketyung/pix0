import { FC } from "react";
import { shortenStringTo } from "../../utils";
import { TextField, commonTextfieldClassName } from "../components/TextField";
import { AccountNFToken } from "../../models";

type Props = {
    nftToken? : AccountNFToken,

    setPrice? : ( price : number) => void,

    price? : number,
}
export const SaleForm : FC <Props> = ({
    nftToken, setPrice, price
}) =>{

    return <div className="mt-2 text-left" style={{minWidth:"600px"}}>
        <div className="mb-4">
        <span className="font-bold mr-2">Token ID:</span>
        <span title={nftToken?.NFTokenID}>{ shortenStringTo(nftToken?.NFTokenID ?? "", 24)}</span>  
        </div>
        <div className="mb-4">
        <TextField label="Price: " type="number" labelInline={true} 
        value={`${price}`}
        onChange={(e)=>{
            if ( setPrice) {
                let p = parseFloat(e.target.value);
                if ( !isNaN(p))
                    setPrice(p);
            }
        }} className={commonTextfieldClassName('ml-2 w-64')}/><span className="ml-2 font-bold">XRP</span>
        </div>
    </div>

}