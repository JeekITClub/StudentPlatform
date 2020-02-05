import {observable, action} from 'mobx';
import {notification} from "antd";
import {AxiosResponse, AxiosError} from 'axios';
import {toJS} from 'mobx';

import DetailStore from './DetailStore'
import Provider from '../../utils/provider';
import * as _ from 'lodash';

class ListStore {
    @observable loading = true;

    @observable data : any[] = [];

    @observable count = 0;
    @observable pageSize = 10;
    @observable pageNum = 1;
    @observable checkingDetail = false;

    url = '';

    detail : DetailStore = null;

    @action fetch = ({ pageNum = 1, pageSize = 10, ...params }) => {
        this.loading = true;
        Provider.get(this.url, {
            params: {
                page: pageNum,
                page_size: pageSize,
                ...params
            }
        })
            .then((res) => {
                this.data = res.data.results;
                this.count = res.data.count;
                this.loading = false
            })
            .catch((err) => {
                notification.error({
                    message: '失败',
                    description: '获取列表失败'
                });
                throw err;
            })
    };

    @action deleteByIndex = (index: number) => {
        const id = this.data[index];
        this.delete(id, index);
    };

    @action delete = (id: number, index: number) => {
        Provider.delete(`${this.url}${id}/`)
            .then((res: AxiosResponse) => {
                notification.success({
                    message: '成功',
                    description: '删除成功'
                });
                this.data = _.dropWhile(this.data, (object) => {
                    return object.id == id
                });
                console.log(toJS(this.data))
            })
            .catch((err: AxiosError) => {
                notification.error({
                    message: '失败',
                    description: '删除失败'
                })
            })
    };

    @action initDetail = (id: number) => {
        this.detail = new DetailStore(this.url, id)
    }
}

export default ListStore;
