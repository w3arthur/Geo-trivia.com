
import  Axios, {
    userRegisterApi
    , loginApi
    , tokenRenewApi
} from './axios';

import deepCopy from './deepCopy';
import getCoords from './getCoords';
//import i18next from './i18next'
import { useReceiver, receiver, transmitter } from './socketio';


export {
    Axios, userRegisterApi, loginApi, tokenRenewApi
    , deepCopy, getCoords
    , useReceiver, receiver, transmitter
};
