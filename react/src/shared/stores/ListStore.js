import {observable, action} from 'mobx';
import {notification} from "antd";

import Provider from '../../utils/provider';

class ListStore {
    @observable loading = true;

    @observable data = [];

    @observable count = 0;
    @observable pageSize = 10;
    @observable pageNum = 1;

    url = '';

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

    @action update = () => {

    };

    @action delete = () => {

    };
}

export default ListStore;
