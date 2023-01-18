import { createContext, useContext, useReducer, useRef } from "react";
//초기상태값지정
const initialState = [
    { 
        id:1,
        text: '프로젝트 생성하기',
        done: false
    },
    { 
        id:2,
        text: '컴포넌트 스타일링하기',
        done: false
    },
    { 
        id:3,
        text: 'Context만들기',
        done: false
    },
    { 
        id:4,
        text: '기능구현하기',
        done: false
    },
];
//리듀서 구현
function todoReducer(state, action){
    switch(action.type){
        //action객체의 type 값이 'CREATE'면
        case 'CREATE':
            return [...state, action.todo];
        case 'TOGGLE':
            return state.map(todo=>
                todo.id === action.id ? {...todo, done: !todo.done} : todo
            )
        case 'REMOVE':
            return state.filter(todo => action.id !== todo.id);
        default:
            return state;
    }
}
//컨택스트 생성
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

const TodoContext = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
};
//커스텀 훅
export function useTodoState(){
    return useContext(TodoStateContext);
}
export function useTodoDispatch(){
    return useContext(TodoDispatchContext);
}
export function useTodoNextId(){
    return useContext(TodoNextIdContext); 
}
export default TodoContext;