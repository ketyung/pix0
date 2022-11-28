import { Message } from "../../models";
import { ErrorView } from "./ErrorView";
import { InfoView } from "./InfoView";
import { FC } from "react";
import { MessageType } from "../../models";


type Props = {

    message : Message,
}

export const MessageView : FC <Props> = ({
    message
}) =>{

    return (message.type === MessageType.Error) ? <ErrorView
    text={message.text}/> : <InfoView text={message.text} hash={message.hash}/>

}