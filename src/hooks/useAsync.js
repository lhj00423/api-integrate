import { useEffect, useReducer } from 'react';

// 1.상태초기화
const initialState = {
    users:null,
    loading:false,
    error:null
}
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading : true,
                data : null,
                error : null
            }
        case 'SUCCESS':
            return {
                loading : false,
                data : action.data,
                error : null
                }
        case 'ERROR':
            return {
                loading : false,
                data : null,
                error : action.error
                }
        default :
            return state; 
    }
       
}


//hooks 함수 -> useAsync 
//deps =[] 디폴트 매개변수 - 빈배열

const useAsync = (callback, deps=[]) => {
    const [state, dispatch] = useReducer(reducer,initialState);
    const fetchUsers = async ()=>{
        //trt catch는 에러났을때 제어하기 -> 에러면 캐치문이 실행됨

        try{
            //요청이 시작되면 error와 users를 초기화
            //loading상태는 true로 변경
            dispatch({
                type : 'LOADING'
            })
            const response = await callback();
            //reducer를 호출하면 쓰임 
            dispatch({
                type : 'SUCCESS',
                data : response.data
            }); //테이터는 response.data안에 있음.  
        } 
        catch(e){
            dispatch({
                type :'ERROR',
                error:e
            })
        }
    //loading상태를 false로 변경
};  
    useEffect(()=>{
        fetchUsers();
    },deps)
    return [state,fetchUsers];
};



export default useAsync;