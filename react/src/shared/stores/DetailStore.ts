import {observable, action} from 'mobx';
import {notification} from "antd";
import {AxiosResponse, AxiosError} from 'axios';

import Provider from '../../utils/provider';

class DetailStore {
    url : string = '';

    constructor(url: string, id: number) {
        this.url = url;
        this.id = id;
        this.fetch({id})
    }

    @observable id : number |  null = null;

    @observable loading : boolean = false;

    @observable data : any = null;

    @action fetch = ({ url = this.url, id } : {url?: string, id: number}) => {
        this.loading = true;
        Provider.get(`${url}${id}/`)
            .then((res: AxiosResponse) => {
                this.id = id;
                this.data = res.data;
                this.loading = false;
            })
            .catch((err: AxiosError) => {
                this.loading = false;
                notification.error({
                    message: '获取详情失败'
                });
            })
    };

    @action delete = () => {
        this.loading = true;
        Provider.delete(`${this.url}${this.id}`)
            .then((res: AxiosResponse) => {
                this.id = null;
                notification.success({
                    message: '成功',
                    description: '删除成功'
                });
                this.loading = false;
            })
            .catch((err: AxiosError) => {
                notification.error({
                    message: '错误',
                    description: '删除失败'
                });
                this.loading = false;
            })
    };

    @action update = () => {
        this.loading = true;
    }
}

export default DetailStore;