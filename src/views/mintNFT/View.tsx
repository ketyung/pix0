import { FC } from "react";
import { SimpleMintForm } from "./SimpleMintForm";

export const View : FC = () =>{

    return <div className="mt-16">
        <h1 className="font-bold mt-2">Mint your NFT</h1>
        <SimpleMintForm/>
    </div>
}