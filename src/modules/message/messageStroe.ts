import {action, observable} from 'mobx';
import {request} from '../../untils/request';

const SIZE = 10;
export default class messageStroe {
  page = 1;
  @observable messageList: MessageListItem[] = [];
  @observable refreshing = false; // 判断当前是否正在加载数据
  @observable unreadList: UnRead = {} as UnRead;

  @action
  setPage = () => {
    this.page = 1;
  };

  requestMessageList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await request('messageList', {
        page: this.page,
        size: SIZE,
      });
      if (data?.length) {
        if (this.page == 1) {
          this.messageList = data;
        } else {
          this.messageList = [...this.messageList, ...data];
        }
        this.page += 1;
      } else {
        if (this.page == 1) {
          this.messageList = [data];
        } else {
          // 已经加载完
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
    }
  };
  requestUnread = async () => {
    try {
      const {data} = await request('unread', {});
      this.unreadList = data;
    } catch (error) {
      console.log(error);
    }
  };
}
