import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './reducers';
import './App.css';
import axios from 'axios';
import { ActionType } from './reducers/posts';

type Props = {
  onIncrement: () => void;
  onDecrement: () => void;
};

function App({ onIncrement, onDecrement }: Props) {
  const [todoValue, setTodoValue] = useState('');
  const counter = useSelector((state: RootState) => state.counter);
  const todos: string[] = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const fetchPosts: any = () => {
    return async function fetchPostsThunk(dispatch: any, getState: any) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: ActionType.FETCH_POSTS, payload: response.data });
    };
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', text: todoValue });
    setTodoValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  return (
    <div className='App'>
      <p>Clicked: {counter} times</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <form onSubmit={addTodo}>
        <input type='text' value={todoValue} onChange={handleChange} />
        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
