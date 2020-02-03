import {observable, action} from "mobx";
import ListStore from '../../../../shared/stores/ListStore';
import Provider from '../../../../utils/provider';
import {AxiosResponse, AxiosError} from 'axios';
import {ISociety} from "../../../../types";
import {notification} from 'antd';

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
            .catch((err: AxiosError) => {
                notification.error({
                    message: '错误',
                    description: '获取社团列表失败'
                })
            })
    };

    @action createCreditDistribution = ({year, semester, credit, society_id_set} : {year: number, semester: number, credit: number, society_id_set: number[]}) => {
        Provider.post(`${this.url}manual_create/`, {
            year,
            semester,
            credit,
            society_id_set
        })
            .then((res: AxiosResponse) => {
                this.createCDModalVisible = false;
                notification.success({
                    message: '成功'
                })
            })
            .catch((err: AxiosError) => {
                notification.error({
                    message: '错误'
                })
            })
    };

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