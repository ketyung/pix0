import { FC, ReactElement } from "react";
import './css/Dropdown.css';

export interface DropdownItem {

    label? : string|ReactElement, 

    action?: () => void,
}


type Props = {
    
    id? : string ,

    button? : string|ReactElement,

    items? : DropdownItem[],
}

export const Dropdown : FC <Props> = ({
    id, button, items, 
}) =>{

    return <div className="dropdown max-w-lg mx-auto">
    {button ? button :
    <button className="text-white bg-gray-700 hover:bg-gray-800 
    focus:ring-4 focus:ring-gray-300 font-medium rounded-full 
    text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">
    ...</button>}
    <div className="dropdown-content bg-white text-base z-50 list-none divide-y 
    divide-gray-100 rounded shadow z-50" id={id ?? "dd1"}>
    <ul className="text-left" aria-labelledby={id ?? "dd1"}>
        {
            items?.map((a,i)=>{

                return <li key={`dd_${id}_ch_${i}`}>
                    <a className="dropdown-item text-sm
                    p-2 font-normal block
                    w-full whitespace-nowrap
                    bg-transparent text-gray-700 hover:bg-gray-200"
                    onClick={(e)=>{
                        e.preventDefault();
                        if (a.action) {
                            a.action();
                        }

                    }}>{a.label}</a>
                </li>
            })
        }
          
        </ul>
        </div>
    </div>
  
}