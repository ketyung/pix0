import { FC, useState } from "react";
import { TextField, commonTextfieldClassName } from "../components/TextField";


export const SendForm : FC = () =>{

    const [amount, setAmount] = useState(1);

    const [toAddress, setToAddress] = useState("");

    return <div className="mt-2 w-full" style={{minWidth:"450px"}}>
        <div className="mb-4">
            <TextField id="amount" type="number" label="Amount" className={commonTextfieldClassName("w-64")}
            value={`${amount}`} onChange={(e)=>{
                let a = parseFloat(e.target.value);
                if ( !isNaN(a)) {
                    setAmount(a);
                }
            }}/>
            <span className="ml-2 font-bold">XRP</span>
        </div>
        <div className="mb-4">
            <TextField id="to" type="text" label="Address" value={toAddress} onChange={(e)=>{
                
                setToAddress(e.target.value);

            }}/>
        </div>

    </div>
}