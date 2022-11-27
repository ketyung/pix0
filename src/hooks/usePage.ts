import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback} from "react";
import { PageState } from "../utils/sm/PageReducer";
import { setPage as setPageAs } from "../utils/sm/PageActions";
import { Page } from "../models";

export default function usePage() {

    const dispatch: Dispatch<any> = useDispatch();

    const setPage = useCallback((page : Page, param? : any) => 
    {dispatch(setPageAs(page, param)); },[dispatch]);

    const pageState : PageState =  useSelector(
        (_state: any) => {return _state.pageReducer;}, shallowEqual
    );

    const page : Page | undefined = pageState.page;

    const param : any | undefined = pageState.param;


    const isPage = (_page : Page) : boolean =>{
        return _page === page;
    }

    return {page, setPage,isPage, param} as const;
    
}