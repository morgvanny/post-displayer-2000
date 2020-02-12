import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Posts from "./Posts";
import reducer from "./reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  );
}

export default App;
