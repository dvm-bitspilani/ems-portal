import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "../store/reducers/events";
import teamsReducer from "../store/reducers/teams";
import scoreReducer from "../store/reducers/score";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  // level: levelReducer,
  events: eventsReducer,
  teams: teamsReducer,
  score: scoreReducer
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;