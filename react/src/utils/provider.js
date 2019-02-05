import axios from 'axios';
import {computed} from 'mobx';
import {getCookie} from './cookie';

const Provider = {
    @computed get provider() {
        return axios.create({
            withCredentials: true,
            headers: {
                'X-CSRFToken': getCookie('csrftoken'), // todo
            },
        })
    },

    getInstance() {
        return this.provider
    },

    request(...args) {
        return this.provider.request(...args)
    },

    post(...args) {
        return this.provider.post(...args)
    },

    get(...args) {
        return this.provider.get(...args)
    },

    patch(...args) {
        return this.provider.patch(...args)
    }
};

export default Provider;