import {notification} from 'antd';
import {observable, action} from "mobx";

import {ISociety} from '../../../types';
import Provider from '../../../utils/provider';
import {AxiosResponse} from "axios";

class AdminSocietyStore {
  @observable society: ISociety = null;
  @observable loading: boolean = false;

  @action changeLoading() {
    this.loading = !this.loading
  }

  @action getProfile = (): void => {
    this.changeLoading();
    Provider.get('/api/society_manage/profile/')
      .then((response: AxiosResponse) => {
        this.society = response.data.results[0];
      })
      .catch(() => {
        notification.error({
          message: 'Oops...',
          description: '获取社团资料失败'
        })
      })
      .finally(() => {
        this.changeLoading();
      })
  }
}

export default new AdminSocietyStore;