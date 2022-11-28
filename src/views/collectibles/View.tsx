import { FC } from "react";
import { List } from "./List";

export const View : FC = () =>{

    return <div className="mt-10">
        <h2>Your collectibles</h2>
        <List/>
    </div>
}