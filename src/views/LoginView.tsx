import { FC, useState } from "react";
import logo from '../images/pix0_logo1.png';
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

    return <div className="m-auto p-10 mt-20 border-1 border-gray-300 rounded-3xl w-3/5 
    shadow-2xl text-center">
          <div className="m-2 text-center mx-auto">
            <img src={logo} className="w-64 h-auto mx-auto" title="Pix0 Logo"/>
          </div>
          <div className="m-2 text-left pl-4">
            <b>Pix0</b> - is an all-in-one NFT wallet and marketplace on the <b>XRP Ledger</b>, 
            which you can use to create, mint your collection of NFTs and trade them on the marketplace.
          </div>
          <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
            <h2 className="text-2xl mb-4 font-bold">Sign In</h2>
            <div className="mb-4 text-left">
                <TextField label="Password" type="password" onChange={(e)=>{
                    setPass(e.target.value);
                }}/>
            </div>
            <div className="mb-4">
                <button title="Login" 
                className="text-sm w-32 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
                onClick={(e)=>{
                    e.preventDefault();
                    createPassword();
                }}>Login</button>
            </div>
            
          </form>
    </div>
}