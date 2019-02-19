import {observable, computed, action} from "mobx";

import Provider from '../../../utils/provider'
import {notification} from "antd";

class CreditStore {
    @observable id = 0;
    @observable credit = 0;
    @observable closed = true;

    @observable available_receivers = [];

    @observable chosenIds = [];

    @computed get availableCredit() {
        return this.credit - this.chosenIds.length
    }

    @action updateChosenIds = (chosenIds) => {
        this.chosenIds = chosenIds
    };

    @action fetch = () => {
        const year = 2018;
        const semester = 1;
        Provider.get(`/api/society_manage/credit?year=${year}&semester=${semester}`)
            .then((res) => {
                this.credit = res.data['credit'];
                this.available_receivers = res.data['available_receivers'];
                this.chosenIds = res.data['receivers'];
                this.closed = res.data['closed'];
                this.id = res.data['id']
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    notification.warning({
                        message: 'Oops...',
                        description: '社团部还未设置本学期的学分'
                    });
                } else {
                    notification.error({
                        message: 'Oops...',
                        description: '获取分配学分信息失败，请检查你的网络'
                    });
                }
            })
    };

    @action submit() {
        Provider.patch(`/api/society_manage/credit/${this.id}/`, {
            receivers: this.chosenIds
        })
            .then((res) => {
                if (res.status === 200) {
                    this.fetch();
                    notification.success({
                        message: '成功',
                        description: '登记本社团学分分配成功'
                    });
                }
            })
            .catch((err) => {
                notification.error({
                    message: 'Oops..',
                    description: '登记本社团学分分配失败'
                });
                throw err;
            })
    }
}

export default new CreditStore;