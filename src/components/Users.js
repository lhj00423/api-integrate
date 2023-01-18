import axios from 'axios';
import React from 'react';
import useAsync from '../hooks/useAsync';

//callback으로 호출됨
async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    )
    return response;
}
const Users = () => {
    const [state, refetch] = useAsync(getUsers,[]);  //[state,fetchUsers]
    const { loading, data:users, error} = state;  //state.data 를 users로 받기
    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!users) return null;
    return (
        <div>
            <ul>
            {users.map(user=><li key={user.id}>
                {user.username} {user.name}</li>)}
            </ul>
            <button onClick={refetch}>재요청</button>
        </div>
    );
};
export default Users;