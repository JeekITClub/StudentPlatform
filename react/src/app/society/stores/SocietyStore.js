import { observable, action } from "mobx";

class SocietyStore {
    @observable loading = false;
    @observable societies = [
        {name: 'JEEK信息社', society_id: 233, tags:['233', '666']},
        {name: '金苹果电视台', society_id: 233, tags:['233', '666']},
        {name: '坚持不做马斯狗', society_id: 233, tags:['233', '666']},
        {name: 'jeek', society_id: 233, tags:['233', '666']},
        {name: 'jeek', society_id: 233, tags:['233', '666']},
        {name: 'jeek', society_id: 233, tags:['233', '666']},
    ];

    @observable filteredSocieties = [];

    @observable query = '';

    @action changeLoading () {
        this.loading = !this.loading
    }

    @action changeQuery = (query) => {
        this.query = query;
    };

    @action fetch = () => {

    }

}

export default new SocietyStore;