import { FC } from "react";
import { List } from "./List";

export const View : FC = () =>{

    return <div className="mt-14">
        <h2 className="mt-4 font-bold">Your collectibles</h2>
        <List/>
    </div>
}