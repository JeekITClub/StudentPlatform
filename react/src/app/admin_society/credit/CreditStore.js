import {observable, computed, action} from "mobx";

import Provider from '../../../utils/provider'
import {notification} from "antd";

class CreditStore {
    @observable credit = 0;

    @observable available_receivers = [
        { name: 'ncjxjj', class_num: 0, grade: 0, username: 123 },
        { name: 'ncjdjj', class_num: 2, grade: 3, username: 124 }
    ];

    @observable chosenIds = [];

    @computed get availableCredit() {
        return this.credit - this.chosenIds.length
    }

    @action updateChosenIds = (chosenIds) => {
        this.chosenIds = chosenIds
    };

    @action fetch = () => {
        Provider.post('/api/society_manage/credit/')
            .then((res) => {
                this.available_receivers = res.data['available_receivers'];
                this.chosenIds = res.data['receivers']
            })
            .catch((err) => {
                notification.error({
                    message: 'Oops..',
                    description: '获取分配学分信息失败'
                });
                throw err
            })
    };

    @action submit = () => {
        Provider.patch('/api/society_manage/credit/', data = {
            receivers: this.chosenIds
        })
            .then((res) => {
                if (res.status === 200) {
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