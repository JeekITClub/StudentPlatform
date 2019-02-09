import {observable, computed} from "mobx";

class AccountStore {
    @observable user = {};

    @observable authenticated = false;

}

export default new AccountStore();