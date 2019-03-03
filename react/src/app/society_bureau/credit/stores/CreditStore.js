import ListStore from '../../../../shared/stores/ListStore';

class CreditStore extends ListStore {
    url = '/api/manage/credit/'
}

export default new CreditStore;