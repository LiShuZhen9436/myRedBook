import {request} from '../untils/request';
import {save} from '../untils/Storage';
import {flow} from 'mobx';

class loginStore {
  userInfo: any;

  //   async loginRequest(
  //     phone: string,
  //     pwd: string,
  //     callback: (success: boolean) => void,
  //   ) {
  //     const {data} = await request('login', {phone, pwd});
  //     try {
  //       if (data) {
  //         save('userInfo', data);
  //         this.userInfo = data;
  //         callback?.(true);
  //       } else {
  //         this.userInfo = null;
  //         callback?.(false);
  //       }
  //     } catch (error) {
  //       this.userInfo = null;
  //       callback?.(false);
  //     }
  //   }

  loginRequest = flow(function* (
    this: loginStore,
    name: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) {
    const {data} = yield request('login', {name, pwd});
    console.log('data:', data);
    try {
      if (data) {
        save('userInfo', JSON.stringify(data));
        this.userInfo = data;
        callback?.(true);
      } else {
        this.userInfo = null;
        callback?.(false);
      }
    } catch (error) {
      this.userInfo = null;
      callback?.(false);
    }
  });
}

export default new loginStore();
