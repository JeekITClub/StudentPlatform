import {notification} from 'antd';
import {action, computed, observable} from "mobx";

import {ISociety} from '../../../types';
import Provider from '../../../utils/provider';
import {AxiosError, AxiosResponse} from "axios";
import {society_type} from "../../../shared/constants";

class AdminSocietyStore {
  @observable society: ISociety = null;
  @observable loading: boolean = false;

  @computed get societyTypeText(): string {
    return society_type[this.society?.type];
  }

  @action changeLoading() {
    this.loading = !this.loading
  }

  @action getProfile = (): void => {
    this.changeLoading();
    Provider.get('/api/society_manage/profile/')
      .then((response: AxiosResponse) => {
        this.society = response.data;
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
  };

  @action updateProfile = (data: ISociety): void => {
    this.changeLoading();
    Provider.patch(`/api/society_manage/profile/${this.society?.id}/`, data)
      .then((response: AxiosResponse) => {
        notification.success({
          message: '成功',
          description: '社团信息已更新'
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        notification.error({
          message: 'Oops...',
          description: '社团信息更新失败'
        });
      })
      .finally(() => {
        this.changeLoading();
      })
  }
}

export default new AdminSocietyStore();