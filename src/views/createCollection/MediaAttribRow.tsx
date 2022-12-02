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

    return <div className="hover:bg-gray-300 pt-2 text-left rounded-2xl">
        <div className="inline-block mr-2">
            <TextField className={commonTextfieldClassName("w-64 ml-2")}
            placeholder="Trait/Attribute"
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
            <TextField placeholder="Display Type" className={commonTextfieldClassName("w-32 ml-2")}
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
            <TextField placeholder="value..." className={commonTextfieldClassName("w-64 ml-2")}
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
        className="text-sm w-8 text-center font-bold ml-4 p-2 mb-2 bg-gray-900 rounded text-white" 
        onClick={(e)=>{
            e.preventDefault();

            if (removeMediaAttributeAt) removeMediaAttributeAt(index);
            
        }}><i className="fa fa-remove"/></button> 
        </div>
    </div>
}