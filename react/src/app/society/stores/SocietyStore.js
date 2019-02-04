import {observable, action} from "mobx";
import Provider from '../../../utils/provider';

class SocietyStore {
    @observable loading = false;
    @observable societies = [];

    @observable filteredSocieties = [];

    @observable query = '';

    @action changeLoading() {
        this.loading = !this.loading
    }

    @action changeQuery = (query) => {
        this.query = query;
    };

    @action updateSociety = (societies) => {
        this.societies = societies
    };

    @action fetch = () => {
        Provider.get('/api/society/')
            .then((res) => {
                this.updateSociety(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export default new SocietyStore;