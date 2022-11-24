import './App.css';
import Todo from './components/todo';
import store from './redux/store';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <h1 className="font-extrabold text-center mt-3">TODO APP</h1>
      <Todo/>
    </Provider>
  );
}

export default App;
