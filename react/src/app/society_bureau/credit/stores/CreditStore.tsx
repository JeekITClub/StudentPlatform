import {observable, action, computed} from "mobx";
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
    // updateCreditModal 用于调整单个CD的credit值
    @observable updateCreditModalVisible: boolean = false;
    @observable setAllModalVisible: boolean = false;
    @observable createCDModalVisible: boolean = false;
    @observable createCDBulk: boolean = false;
    @observable setAllCredit: number = 1;

    @observable editing: {
        id: number,
        index: number
    } = {
        id: 1,
        index: 1
    };

    @computed get defaultCreditValue () {
        if (this.data && this.data.length > 1) {
            return this.data[this.editing.index].credit
        }
        return 0
    }


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

    };

    @action updateSingleCDCredit = (cd_id: number, updatedCredit: number) : void => {
        Provider.patch(`${this.url}${cd_id}/`, {
            credit: updatedCredit
        })
            .then((res: AxiosResponse) => {
                notification.success({
                    message: '更新成功'
                })
            })
            .catch((err: AxiosError) => {
                notification.error({
                    message: '错误'
                })
            })
    }

}

export default new CreditStore;