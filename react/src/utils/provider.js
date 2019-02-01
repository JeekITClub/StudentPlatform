import axios from 'axios';
import {computed} from 'mobx';

const Provider = {
    @computed get provider() {
        return axios.create({
            withCredentials: true,
            headers: {
                'X-CSRFToken': null, // todo
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
        return this.provider.post(...args)
    }
};

export default Provider;