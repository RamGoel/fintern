import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
