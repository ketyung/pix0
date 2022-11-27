import { Page } from '../../models';
import * as PageActions from './PageActions';

export type PageState = {

    page? : Page,

    param? : any, 

    dateUpdated? : Date, 

}

const INIT_STATE : PageState = {
    
    page : Page.Wallet ,

    dateUpdated : new Date(), 
};


export const PageReducer = (state : PageState = INIT_STATE, action : PageActions.PageAction ) : PageState => {

 
    switch(action.type) {

        case PageActions.SET_PAGE :
          
            return {...state, page : action.page, param : action.param, dateUpdated : action.dateUpdated};
  
        default :

            return state; 
    }
}