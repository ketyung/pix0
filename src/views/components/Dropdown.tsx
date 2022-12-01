import { FC, ReactElement, useState } from "react";

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

    const [show, setShow] = useState(false);


    return <div className="max-w-lg mx-auto">
    <button className="text-white bg-blue-700 hover:bg-blue-800 
    focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-4 py-2.5 text-center inline-flex items-center" 
    type="button" data-dropdown-toggle={id ?? "dd1"} onClick={(e)=>{
        e.preventDefault();
        setShow(!show);
    }}>
    {button}</button>
    <div className={`${show ? "" : "hidden "}bg-white text-base z-50 list-none divide-y 
    divide-gray-100 rounded shadow my-4 z-50`} id={id ?? "dd1"}>
    <ul className="py-1 text-left" aria-labelledby={id ?? "dd1"}>
        {
            items?.map((a,i)=>{

                return <li key={`dd_${id}_ch_${i}`}>
                    <a className="dropdown-item text-sm
                    py-2 px-4 font-normal block
                    w-full whitespace-nowrap
                    bg-transparent text-gray-700 hover:bg-gray-100"
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