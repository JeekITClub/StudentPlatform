import {observable, computed, action} from "mobx";

import Provider from '../../../utils/provider'

class CreditStore {
    @observable credit = 0;

    @observable available_receivers = [
        {name: 'ncjxjj', class_num: 0, grade: 0, username: 123},
        {name: 'ncjdjj', class_num: 2, grade: 3, username: 124}
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
                console.log(err)
            })
    };

    @action submit = () => {
        Provider.post('/api/society_manage/credit/receiver/')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default new CreditStore;