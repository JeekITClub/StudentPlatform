import {observable, action} from 'mobx';
import {notification} from "antd";

import DetailStore from './DetailStore'
import Provider from '../../utils/provider';

class ListStore {
    @observable loading = true;

    @observable data : any[] = [];

    @observable count = 0;
    @observable pageSize = 10;
    @observable pageNum = 1;
    @observable checkingDetail = false;

    url = '';

    detail = null;

    @action fetch = ({ pageNum = 1, pageSize = 10, ...params }) => {
        this.loading = true;
        return Provider.get(this.url, {
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
        this.delete(id);
    };

    @action delete = (id: number) => {
        return Provider.delete(`${this.url}${id}`)
    };

    @action initDetail = (id: number) => {
        this.detail = new DetailStore(this.url, id)
    }
}

export default ListStore;
