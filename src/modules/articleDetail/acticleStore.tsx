import {action, observable} from 'mobx';
import {request} from '../../untils/request';

export default class homeStroe {
  @observable acticleList: Article = {} as Article;

  requestActicleList = async (id: string) => {
    try {
      const {data} = await request('acticleDetail', {
        id,
      });
      //   console.log('data:', data);
      this.acticleList = data || {};
    } catch (error) {
      console.log(error);
    }
  };
}
