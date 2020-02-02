import {observable, action} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from '../../../../utils/provider';
import {AxiosResponse, AxiosError} from 'axios';
import {ISociety} from "../../../../types";

class CreditStore extends ListStore {
    url = '/api/manage/credit/';

    @observable activeSocieties: ISociety[] = [];
    @observable year: number = null;
    @observable semester: number = null;
    @observable setAllModalVisible: boolean = false;
    @observable createCDModalVisible: boolean = false;
    @observable createCDBulk: boolean = false;
    @observable setAllCredit: number = 1;

    @action bulkCloseCD = () : void => {
        Provider.post(`${this.url}bulkClose`)
            .then((res: AxiosResponse) => {})
            .catch((err: AxiosError) => {throw err})
    };

    @action fetchActiveSocieties = () : void => {
        Provider.get('/api/manage/society/all/')
            .then((res: AxiosResponse) => {
                this.activeSocieties = res.data;
            })
            .catch((err: AxiosError) => {throw err})
    };

    @action createCreditDistribution = ({year, semester, society_id_set}: {year: number, semester: number, society_id_set: number[]}) => {
        Provider.post(`${this.url}manual_create/`, {
            year,
            semester,
            society_id_set
        })
            .then((res: AxiosResponse) => {})
            .catch((err: AxiosError) => {})
    }

    @action bulkCreateCreditDistribution = () => {
        Provider.post('')
    };

    @action submitSetAllCredit = () => {
        Provider.post('/api/manage/')
    };

    @action showCreateModal = (bulk: boolean) => {
        this.createCDModalVisible = true;
        this.createCDBulk = bulk
    };

    @action handleBulkCloseCreditDistribution = () : void => {

    }

}

export default new CreditStore;