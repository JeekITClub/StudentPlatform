import {observable, computed, action} from "mobx";

import Provider from '../../utils/provider'

class AccountStore {
    @observable loading = false;

    @observable identity = null;
    @observable user = {};

    @observable authenticated = true;

    @computed get is_student() {
        return this.identity === 'student';
    }

    @computed get is_society() {
        return this.identity === 'society';
    }

    @computed get is_society_bureau() {
        return this.identity === 'society_bureau';
    }

    @action fetch () {
        Provider.get('/api/account/identity/')
            .then((res) => {
                this.authenticated = true;
                this.identity = res.data['identity'];
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

export default new AccountStore();