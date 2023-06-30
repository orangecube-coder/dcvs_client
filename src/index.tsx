import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {injectStores} from '@mobx-devtools/tools';
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AlertStore from "./store/AlertStore";
import AuthStore from "./store/AuthStore";
import UserStore from "./store/UserStore";
import JournalStore from "./store/JournalStore";
import AreaStore from "./store/journalStore/AreaStore";
import NodeStore from "./store/journalStore/NodeStore";
import RecordStore from "./store/journalStore/RecordlStore";

interface State {
  alertStore: AlertStore;
  authStore: AuthStore;
  userStore: UserStore;
	recordStore: RecordStore;
  journalStore: JournalStore;
}

const alertStore = new AlertStore();
const authStore = new AuthStore();
const userStore = new UserStore(alertStore);
const nodeStore = new NodeStore(alertStore);
const areaStore = new AreaStore(alertStore);
const recordStore = new RecordStore(alertStore);
const journalStore = new JournalStore(alertStore, nodeStore, areaStore, recordStore);

export const Context = createContext<State>({
  alertStore,
  authStore,
  userStore,
	recordStore,
  journalStore,
});

injectStores({
  alertStore,
  authStore,
  userStore,
	recordStore,
  journalStore,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Context.Provider
    value={{
      alertStore,
      authStore,
      userStore,
			recordStore,
      journalStore
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
