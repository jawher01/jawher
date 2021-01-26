import { combineReducers } from "redux";
import { userReducer } from "./user";
import { publicationReducer } from "./publication"
import { editReducer } from "./edit";
export const rootReducer = combineReducers({ userReducer, publicationReducer , editReducer });
