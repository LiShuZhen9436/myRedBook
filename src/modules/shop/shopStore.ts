import {action, observable} from 'mobx';
import {request} from '../../untils/request';

const SIZE = 10;
export default class shoStroe {
  page = 1;
  @observable shopList: GoodsSimple[] = [];
  @observable refreshing = false; // 判断当前是否正在加载数据
  @observable categoryList: GoodsCategory[] = [];

  @action
  setPage = () => {
    this.page = 1;
  };

  requestShopList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      this.refreshing = true;
      const {data} = await request('goodsList', {
        page: this.page,
        size: SIZE,
      });
      if (data?.length) {
        if (this.page == 1) {
          this.shopList = data;
        } else {
          this.shopList = [...this.shopList, ...data];
        }
        this.page += 1;
      } else {
        if (this.page == 1) {
          this.shopList = [data];
        } else {
          // 已经加载完
        }
      }
      console.log('this.shopList:');
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
    }
  };
  top10Category = async () => {
    try {
      const {data} = await request('top10Category', {});
      this.categoryList = data;
    } catch (error) {
      console.log(error);
    }
  };
}
