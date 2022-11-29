import { FC, useState } from "react";
import { WalletPasswordStorage } from "../utils/local-storage";
import { TextField } from "./components/TextField";

type Props = {

    setPasswordCreated? : (created : boolean) => void, 
}

export const LoginView : FC <Props>= ({
    setPasswordCreated
}) =>{


    const [pass, setPass] = useState<string>();

    const createPassword = () =>{

        if ( pass ) {

            WalletPasswordStorage.set(pass);
            if ( setPasswordCreated)
                setPasswordCreated(true);
        }
       
    }

    return <div className="m-auto p-10 mt-20 border-2 border-gray-300 rounded-3xl w-7/12 text-center">
          <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
            <div className="mb-4">
                <TextField label="Password" type="password" onChange={(e)=>{
                    setPass(e.target.value);
                }}/>
            </div>
            <div className="mb-4">
                <button title="Login" 
                className="text-sm min-w-35 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
                onClick={()=>{
                    createPassword();
                }}>Login</button>
            </div>
            
          </form>
    </div>
}