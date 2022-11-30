import { FC } from "react";

type Props = {

    className? : string,
    
    id? : string,
    
    type? : string,
    
    placeholder?: string, 
 
    label? : string, 

    autoComplete? : string,

    onChange? : (e: any ) => void,

    onClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
    onDoubleClick? : (e: React.FormEvent<HTMLInputElement>) => void,

    labelInline? : boolean,
 
}

export const TextField : FC <Props>= ({
    className, id, type, placeholder, label, 
    onChange, onClick, onDoubleClick, autoComplete, labelInline
}) =>{

    return  <><label className={
    `text-gray-700 text-sm font-bold mb-2${(labelInline ? " inline-block" : " block")}`} 
    htmlFor={id}>{label}</label><input className={ className ?? 
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
    id={id} type={type ?? "text"} placeholder={placeholder ?? ""} autoComplete={autoComplete}
    onChange={onChange} onClick={onClick} onDoubleClick={onDoubleClick}/></>

}