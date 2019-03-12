import {action, observable} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from "../../../../utils/provider";
import {notification} from "antd";

class CreditStore extends ListStore {
    url = '/api/manage/credit/';

    @observable year = null;
    @observable semester = null;

    @action fetch = ({ pageNum = 1, pageSize = 10 }) => {
        this.loading = true;
        return Provider.get(this.url, {
            params: {
                page: pageNum,
                page_size: pageSize,
                year: this.year,
                semester: this.semester
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
}

export default new CreditStore;