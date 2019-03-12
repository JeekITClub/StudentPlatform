import {observable, action} from 'mobx';
import {notification} from "antd";

import Provider from '../../utils/provider';

class DetailStore {
    url = '';

    constructor(url, id) {
        this.url = url;
        this.id = id;
        console.log('hello');
        this.fetch({id})
    }

    @observable id = null;

    @observable loading = false;

    @observable data = null;

    @action fetch = ({ url = this.url, id }) => {
        this.loading = true;
        Provider.get(`${url}${id}`)
            .then((res) => {
                this.id = id;
                this.data = res.data;
                this.loading = false;
            })
            .catch((err) => {
                notification.error({
                    message: '获取详情失败'
                });
                throw err;
            })
    };

    @action delete = () => {
        this.loading = false;
        return Provider.delete(`${url}${id}`)
    };

    @action update = () => {

    }
}

export default DetailStore;