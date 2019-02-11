import {observable, computed, action} from "mobx";

class CreditStore {
    @observable credit = 0;

    @observable members = [
        {name: 'ncjxjj', class_num: 0, grade: 0, username: 123},
        {name: 'ncjdjj', class_num: 2, grade: 3, username: 124}
    ];

    @observable chosenIds = [];

    @computed get availableCredit() {
        return this.credit - this.chosenIds.length
    }

    @action updateChosenIds = (chosenIds) => {
        this.chosenIds = chosenIds
    }
}

export default new CreditStore;