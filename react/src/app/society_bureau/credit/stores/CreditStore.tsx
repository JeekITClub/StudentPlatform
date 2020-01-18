import {observable, action} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from '../../../../utils/provider';
import {AxiosResponse} from 'axios';
import { ProvidedRequiredArguments } from "graphql/validation/rules/ProvidedRequiredArguments";

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
        return Provider.get('/api/manage/society/all/')
    }

    @action createCreditDistribution = ({year, semester, society_id_set}: {year: Number, semester: Number, society_id_set: Number[]}) => {
        Provider.post(`${this.url}manual_create/`, {
            year,
            semester,
            society_id_set
        })
            .then((res: AxiosResponse) => {})
            .catch((err: Error) => {})
    }

    @action bulkCreateCreditDistribution = () => {
        Provider.post('')
    }

    @action submitSetAllCredit = () => {
        Provider.post('/api/manage/')
    }

    @action showCreateModal = (bulk: boolean) => {
        this.createCDModalVisible = true;
        this.createCDBulk = bulk
    }

    @action handleBulkCloseCreditDistribution: any = () => {

    }

}

export default new CreditStore;