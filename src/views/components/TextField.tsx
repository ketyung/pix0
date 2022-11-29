import { FC } from "react";

type Props = {

    className? : string,
    
    id? : string,
    
    type? : string,
    
    placeholder?: string, 
 
    label? : string, 

    onChange? : (e: any ) => void,

    onClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
    onDoubleClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
}

export const TextField : FC <Props>= ({
    className, id, type, placeholder, label, onChange, onClick, onDoubleClick
}) =>{

    return  <><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
    {label}</label><input className={ className ?? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
    id={id} type={type ?? "text"} placeholder={placeholder ?? ""}
    onChange={onChange} onClick={onClick} onDoubleClick={onDoubleClick}/></>

}