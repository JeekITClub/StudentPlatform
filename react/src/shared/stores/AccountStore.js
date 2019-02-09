import {observable, computed} from "mobx";

class AccountStore {
    @observable user = {};

    @observable authenticated = true;

    @computed get is_student() {
        return this.user.identity === 'student';
    }

    @computed get is_society() {
        return this.user.identity === 'society';
    }

    @computed get is_society_bureau() {
        return this.user.identity === 'society_bureau';
    }
}

export default new AccountStore();