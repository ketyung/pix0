import { FC, useState } from "react";
import logo from '../images/pix0_logo1.png';
import { WalletPasswordStorage } from "../utils/sess-storage";
import { TextField } from "./components/TextField";

type Props = {

    setPasswordCreated? : (created : boolean) => void, 
}

export const LoginView : FC <Props>= ({
    setPasswordCreated
}) =>{


    const [pass, setPass] = useState<string>();

    const [rpass, setRpass] = useState<string>();

    const [mode, setMode] = useState(0);

    const signIn = () =>{

        if ( pass ) {

            WalletPasswordStorage.set(pass);
            if ( setPasswordCreated)
                setPasswordCreated(true);
        }
       
    }


    const signInForm = <>
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
            signIn();
        }}>Login</button>
    </div>
    </>


    const createNewForm = <>
    <h2 className="text-2xl mb-4 font-bold">Create Account</h2>
    <div className="mb-4 text-left">
        <TextField label="Password" id="pw" type="password" onChange={(e)=>{
            setPass(e.target.value);
        }}/>
    </div>
    <div className="mb-4 text-left">
        <TextField label="Password Again" id="rpw" type="password" onChange={(e)=>{
            setPass(e.target.value);
        }}/>
    </div>
    <div className="mb-4">
        <button title="Create Account" 
        className="text-sm w-32 font-bold ml-4 p-2 mb-2 bg-gray-500 rounded text-white" 
        onClick={(e)=>{
            e.preventDefault();
            
        }}>Create Account</button>
    </div>
    </>

    return <div className="m-auto p-10 mt-20 border-1 border-gray-300 rounded-3xl w-3/5 
    shadow-2xl text-center mb-10">
          <div className="m-2 text-center mx-auto">
            <img src={logo} className="w-64 h-auto mx-auto" title="Pix0 Logo"/>
          </div>
          <div className="m-2 text-left pl-4">
            <b>Pix0</b> - is an all-in-one NFT wallet and marketplace on the <b>XRP Ledger</b>, 
            which you can use to create, mint NFTs and trade them on the marketplace.
          </div>
          <form className="bg-white px-8 pt-6 pb-8 mb-4 mt-4">
            {mode === 1 ? createNewForm : signInForm}
          </form>
          <div className="mt-2 text-sm">Haven't create an account yet? 
          Click <a className="text-blue-500 cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            setMode(1);
          }}>here</a> to create one</div>
    </div>
}