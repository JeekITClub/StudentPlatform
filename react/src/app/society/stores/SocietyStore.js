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
        this.changeLoading();
        Provider.get('/api/society/')
            .then((res) => {
                this.changeLoading();
                this.updateSociety(res.data)
            })
            .catch((err) => {
                this.changeLoading();
                console.log(err)
            })
    }

}

export default new SocietyStore;