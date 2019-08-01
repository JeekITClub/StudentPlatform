import {observable, action} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from '../../../../utils/provider';

class CreditStore extends ListStore {
    url = '/api/manage/credit/';

    @observable year = null;
    @observable semester = null;

    @action bulkCloseCD = () => {
        Provider.post(`${this.url}bulkClose`)
            .then((res) => {})
            .catch((err) => throw err)
    }

}

export default new CreditStore;