import { createRoot } from 'react-dom/client';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './app/query.js';
import cartReducer, { getTotals } from './app/basketSlice.js';
import './index.css'



const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(getTotals());

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
