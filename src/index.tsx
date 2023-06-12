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
import AreaStore from "./store/AreaStore";
import NodeStore from "./store/NodeStore";

interface State {
  alertStore: AlertStore;
  authStore: AuthStore;
  userStore: UserStore;
  journalStore: JournalStore;
}

const alertStore = new AlertStore();
const authStore = new AuthStore();
const userStore = new UserStore(alertStore);
const nodeStore = new NodeStore(alertStore);
const areaStore = new AreaStore(alertStore);
const journalStore = new JournalStore(alertStore, nodeStore, areaStore);

export const Context = createContext<State>({
  alertStore,
  authStore,
  userStore,
  journalStore,
});

injectStores({
  alertStore,
  authStore,
  userStore,
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
      journalStore
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
