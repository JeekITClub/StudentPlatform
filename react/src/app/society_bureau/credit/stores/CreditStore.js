import {observable} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';

class CreditStore extends ListStore {
    url = '/api/manage/credit/';

    @observable year = null;
    @observable semester = null;

}

export default new CreditStore;