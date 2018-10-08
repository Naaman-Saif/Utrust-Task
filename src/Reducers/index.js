import {combineReducers} from 'redux';
import TxReducer from './TxReducer';

export default combineReducers({
    TxStatus:TxReducer
});