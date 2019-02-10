import {observable, computed, action} from "mobx";

import Provider from '../../utils/provider'

class AccountStore {
    @observable loading = false;

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

    @action fetch () {
        Provider.get('/api/account/profile/')
            .then((res) => {
                this.authenticated = true;
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

export default new AccountStore();