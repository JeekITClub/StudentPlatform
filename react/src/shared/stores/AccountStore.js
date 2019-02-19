import {observable, computed, action} from "mobx";

import Provider from '../../utils/provider'

class AccountStore {
    @observable loading = false;

    @observable user = null;

    @observable authenticated = false;

    @computed get is_student() {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'student';
        }
        return false
    }

    @computed get is_society() {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'society';
        }
        return false
    }

    @computed get is_society_bureau() {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'society_bureau';
        }
        return false
    }

    @action fetch = () => {
        this.loading =  true;
        return Provider.get('/api/account/user/')
            .then((res) => {
                if (res.status === 200) {
                    this.authenticated = true;
                    this.user = res.data;
                    this.loading = false
                }
            })
            .catch((e) => {
                this.loading = false;
                throw e
            })
    }
}

export default new AccountStore();