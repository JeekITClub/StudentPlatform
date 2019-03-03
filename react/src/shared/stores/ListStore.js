import {observable, action} from 'mobx';
import {notification} from "antd";

import Provider from '../../utils/provider';

class ListStore {
    @observable loading = true;

    @observable data = [];

    @observable count = 0;
    @observable pageSize = 10;
    @observable pageNum = 0;

    url = '';

    @action fetch = (pageNum, pageSize, ...rest) => {
        this.loading = true;
        return Provider.get(this.url, {
            params: {
                page: pageNum,
                page_size: pageSize,
                ...rest
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
