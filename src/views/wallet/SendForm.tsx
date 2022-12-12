import { FC, useState } from "react";
import useXrp from "../../hooks/useXrp";
import { shortenStringTo } from "../../utils";
import { Message, MessageType } from "../../models";
import { MessageView } from "../components/MessageView";
import { Spinner } from "../components/Spinner";
import { TextField, commonTextfieldClassName } from "../components/TextField";


export const SendForm : FC = () =>{

    const [amount, setAmount] = useState(1);

    const [toAddress, setToAddress] = useState("");

    const {sendXrp} = useXrp();

    const [message, setMessage] = useState<Message>();

    const [processing, setProcessing] = useState(false);

    const setMessageNow = (message : Message) =>{

        setMessage(message);
        setTimeout(()=>{
            setMessage(undefined);
        },5000);
    }

    const sendXrpNow = async () =>{

        if ( amount <= 0) {
            window.alert("Invalid amount!");
            return;
        }

        if (toAddress.trim() === ""){
            window.alert("Invalid address");
            return;
        }

        if ( !window.confirm(`Confirm to send ${amount} XRP to ${shortenStringTo(toAddress,10)}?`)){
            return;
        }

        setProcessing(true);

        await sendXrp(toAddress, amount, (e)=>{

            if (e instanceof Error){

                setMessageNow({text: e.message, type : MessageType.Error});
            }
            else {
                setMessageNow({text: "Success", type : MessageType.Info, hash : e.hash});
            }
            setProcessing(false);
        
        });
    }

    return <div className="mt-2 w-max">
        {message && <MessageView message={message}/>}
        <div className="mb-4">
            <TextField id="amount" type="number" label="Amount" className={commonTextfieldClassName("w-64")}
            value={`${amount}`} onChange={(e)=>{
                let a = parseFloat(e.target.value);
                if ( a < 0 ){
                    return;
                }

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
        <div className="mt-4">
        <button title="Send XRP..." disabled={processing}
            className="text-sm w-32 font-bold p-2 mb-2 bg-gray-500 rounded text-white" 
            onClick={async (e)=>{
                e.preventDefault();
                await sendXrpNow();
            }}>{processing ? <Spinner/> : <>Send</>}</button>
        </div>
    </div>
}