import axios from 'axios';
import { apiBaseURL, apiKey } from '../Utils/Constants';
import {
    FETCHING_TX_DATA,
    FETCHING_TX_DATA_SUCCESS,
    FETCHING_TX_DATA_FAIL,
} from '../Utils/ActionTypes';


export default function FetchTxData(TxHash) {
    return dispatch => {

        dispatch({ type: FETCHING_TX_DATA })

        return axios.get(`${apiBaseURL}/api?module=proxy&action=eth_getTransactionReceipt&txhash=${TxHash}&apikey=${apiKey}`)
            .then(res => {
                if(res.data.error != null){
                    return dispatch({ type: FETCHING_TX_DATA_FAIL, payload: res.data });
                }else{
                    return dispatch({type: FETCHING_TX_DATA_SUCCESS, payload:res.data})
                }
            })
            .catch(err => {
                return dispatch({ type: FETCHING_TX_DATA_FAIL, payload: err.data });
            });

    }
}
