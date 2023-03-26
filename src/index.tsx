import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import Store from './store/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface State {
	store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<Context.Provider value={{store}}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Context.Provider>
);