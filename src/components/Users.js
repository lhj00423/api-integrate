import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import useAsync from '../hooks/useAsync';

// 1.상태초기화
// 2.reducer 함수 구현 - 
// 1) 로딩중일때 - loading->true, users-> null, error -> null
// 2)데이터를 성공적으로 받았을때 
// - loading -> false, users ->[], error-> null
// 3) 데이터요청후 에러가 발생했을때 
// - loading -> false, users -> null error -> {e}

async function getUsers(){
    const response = await axios.get(
        //요청할 주소
        'https://jsonplaceholder.typicode.com/users'
    )
    return response;
}
const Users = () => {
    const [state,refetch] = useAsync(getUsers,[]); //[state(0)배열, fetchUsers(재요청)]
    const {loading, data:users, error} = state; // state.data를 users로 받기
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return null;
    return (
        <div>
            <ul>
            {users.map(user=><li key = {user.id}>
                {user.username} {user.name}</li>)}
            </ul>
            <button onClick={refetch}>재요청</button>
        </div>
    );
};



export default Users;