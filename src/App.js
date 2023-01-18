import { createGlobalStyle } from 'styled-components';
import './App.css';
import TodoCreate from './components/TodoCreate';
import TodoHeader from './components/TodoHeader';
import TodoLists from './components/TodoLists';
import TodoTemplate from './components/TodoTemplate';
import TodoContext from './context/TodoContext';

//글로벌 스타일을 추가하고 싶을때
const GlobalStyle = createGlobalStyle`
body{
  background: #e9ecef;
}`;
function App() {
  //칠드런
  return (
    <TodoContext>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHeader/>
        <TodoLists/>
        <TodoCreate/>
      </TodoTemplate>
    </TodoContext>
  );
}

export default App;
