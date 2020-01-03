import {observable, action} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from '../../../../utils/provider';
import {AxiosResponse} from 'axios';

class CreditStore extends ListStore {
    url = '/api/manage/credit/';

    @observable year: number = null;
    @observable semester: number = null;
    @observable setAllModalVisible: boolean = false;
    @observable createCDModalVisible: boolean = false;
    @observable createCDBulk: boolean = false;
    @observable setAllCredit: number = 1;

    @action bulkCloseCD : any = () => {
        Provider.post(`${this.url}bulkClose`)
            .then((res: AxiosResponse) => {})
            .catch((err: Error) => {throw err})
    };

    @action fetchActiveSocieties: any = () => {
        Provider.get('/api/manage/society/all/')
    }

    @action createCreditDistribution = () => {

    }

    @action submitSetAllCredit = () => {

    }

    @action showCreateModal = (bulk: boolean) => {
        this.createCDModalVisible = true;
        this. createCDBulk = bulk
    }

    @action handleBulkCloseCreditDistribution: any = () => {

    }

}

export default new CreditStore;