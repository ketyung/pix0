import { FC } from "react";

export type Props = {

    textColorClass?: string,
}

export const CloseIcon : FC <Props> = ({
    textColorClass
}) =>{

    return <svg className={`h-6 w-6 inline-block ${textColorClass ?? "text-gray-600"}`} viewBox="0 0 24 24"  
    fill="none"  stroke="currentColor"  stroke-width="2"  strokeLinecap="round"  
    strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" /></svg>
}