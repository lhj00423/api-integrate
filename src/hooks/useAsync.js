import { useEffect, useReducer } from 'react';
// 1.상태초기화
const initialState = {
    data:null,
    loading:false,
    error:null
}
function reducer(state,action){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default :
        return state;
    }
}
const useAsync = (callback, deps=[]) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchUsers =  async ()=>{
        try{
            dispatch({
                type:'LOADING'
            })
            const response = await callback();
            dispatch({
                type:'SUCCESS',
                data: response.data 
            });  //데이터는 response.data안에 있음.
        }
        catch(e){
            dispatch({
                type: 'ERROR',
                error:e
            })
        }
    };
    useEffect(()=>{
        fetchUsers();
    },deps)
    return [state,fetchUsers];
};
export default useAsync;