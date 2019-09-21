import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import levelReducer from "../store/reducers/level";
import eventsReducer from "../store/reducers/events";
import teamsReducer from "../store/reducers/teams";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  // level: levelReducer,
  events: eventsReducer,
  teams: teamsReducer
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;