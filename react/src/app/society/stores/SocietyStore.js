import { observable, action } from "mobx";

class SocietyStore {
    @observable loading = false;
    @observable societies = [];

    @observable filteredSocieties = [];

    @observable query = '';

    @action changeLoading () {
        this.loading = !this.loading
    }

    @action changeQuery = (query) => {
        this.query = query;
    };

    @action fetch = () => {

    }

}

export default new SocietyStore;