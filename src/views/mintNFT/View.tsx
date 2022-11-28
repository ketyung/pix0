import { FC } from "react";
import { SimpleMintForm } from "./SimpleMintForm";

export const View : FC = () =>{

    return <div className="mt-10">
        <h1 className="font-bold">Mint your NFT</h1>
        <SimpleMintForm/>
    </div>
}