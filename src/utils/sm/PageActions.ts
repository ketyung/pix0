import { Page } from "../../models";

export const SET_PAGE = "SET_PAGE";

export type PageAction = {

    type: string,

    page? : Page,

    param? : any, 

    dateUpdated? : Date, 

}


export function setPage(page : Page, param? : any ) {

    const action: PageAction = {
        type: SET_PAGE,
        page: page,
        param : param, 
        dateUpdated : new Date(), 
    } 
    return action;
}