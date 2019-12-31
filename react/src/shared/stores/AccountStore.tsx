import {observable, computed, action} from "mobx";

import Provider from '../../utils/provider'
import { AxiosResponse } from "axios";

class AccountStore {
    @observable loading: boolean = false;

    @observable user: any = null;

    @observable authenticated: boolean = false;

    @computed get is_student(): boolean {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'student';
        }
        return false
    }

    @computed get is_society(): boolean {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'society';
        }
        return false
    }

    @computed get is_society_bureau(): boolean {
        if (this.user && this.authenticated) {
            return this.user.identity.identity === 'society_bureau';
        }
        return false
    }

    @action fetch = () => {
        this.loading =  true;
        return Provider.get('/api/account/user/')
            .then((res: AxiosResponse) => {
                if (res.status === 200) {
                    this.authenticated = true;
                    this.user = res.data;
                    this.loading = false
                }
            })
            .catch((e: Error) => {
                this.loading = false;
                throw e
            })
    }
}

export default new AccountStore();