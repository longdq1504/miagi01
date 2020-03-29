import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';

function checkValidParams(params) {
  if(!params.email || params.email === ''){
    throw Error("Vui long nhap email!!");
  }
  if(!params.password || params.password === '') {
    throw Error("Vui long nhap mat khau!!");
  }
}

export const login = (params) => {
  return async () => {
      try {
        checkValidParams(params);
        const {token, user} = await sessionApi.login(params); // sau await buoc phai la Promise, Promise co 2 trang thai pending va done, done thi co 2 TH resolve reject
        console.log(user);                                   // resolve thanh cong va tiep tuc luong, reject thi se di va catch
        await sessionService.saveSession(token);
        await sessionService.saveUser(user);
      } catch (ex) { //reject
        throw ex; 
      }
  };
};

export const logout = () => {
  return async () => {
    try {
      await sessionService.deleteSession();
      await sessionService.deleteUser();
    } catch (error) {
      throw error;
    }
  }
};