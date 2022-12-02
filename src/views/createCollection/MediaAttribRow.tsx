import { TextField, commonTextfieldClassName } from "../components/TextField";
import { MediaAttribute } from "../../models/collection";
import { FC } from "react";


type Props = {

    index? : number, 

    attribute? : MediaAttribute,

    setMediaAttributeAt? : (attribute : MediaAttribute, index? :number) => void,

    removeMediaAttributeAt? : (index? :number) => void,
}

export const MediaAttribRow : FC <Props> = ({
    index, attribute, setMediaAttributeAt, removeMediaAttributeAt
}) =>{

    return <div className="hover:bg-gray-300 p-4 text-left rounded-2xl">
        <div className="inline-block mr-2">
            <TextField label="Attribute/Trait" className={commonTextfieldClassName("w-64 ml-2")}
            labelInline={true} id={`trait_type_${index}`} value={attribute?.trait_type}
            onChange={(e)=>{
                e.preventDefault();
                if ( attribute ) {
                    if ( setMediaAttributeAt)
                        setMediaAttributeAt({...attribute, trait_type : e.target.value}, index);
               
                }
            }} />
        </div>
        <div className="inline-block mr-2">
            <TextField label="Display Type" className={commonTextfieldClassName("w-64 ml-2")}
            labelInline={true} id={`display_type_${index}`} value={attribute?.display_type}
            onChange={(e)=>{
                e.preventDefault();
                if ( attribute ) {
                    if ( setMediaAttributeAt)
                        setMediaAttributeAt({...attribute, display_type : e.target.value}, index);
               
                }
            }} />
        </div>

        <div className="inline-block mr-2">
            <TextField label="Value" className={commonTextfieldClassName("w-64 ml-2")}
            labelInline={true} id={`value_${index}`} value={attribute?.value}
            onChange={(e)=>{
                e.preventDefault();
                if ( attribute ) {
                    if ( setMediaAttributeAt)
                        setMediaAttributeAt({...attribute, value : e.target.value}, index);
               
                }
            }}/>
        </div>

        <div className="inline-block">
        <button title="Remove ?" 
        className="text-sm min-w-32 font-bold ml-4 p-2 mb-2 bg-gray-400 rounded-full text-white" 
        onClick={(e)=>{
            e.preventDefault();

            if (removeMediaAttributeAt) removeMediaAttributeAt(index);
            
        }}><i className="fa fa-minus mr-2"/></button> 
        </div>
    </div>
}