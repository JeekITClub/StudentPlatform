import React from 'react';
import {Upload, message, Button, Icon, notification} from 'antd';

import Provider from '../../../../utils/provider';

let config = {
    headers: {'Content-Type': 'multipart/form-data'}
};

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';

    if (!isJPG && !isPNG) {
        message.error('You can only upload JPG or PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    return isJPG && isLt5M;
}

let upload = (params) => {
    const file = params.file;
    var data = new FormData();
    data.append('avatar', file);
    console.log(file);
    Provider.post('/api/society_manage/profile/upload_avatar/', data, config)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
};

const props = {
    name: 'file',
    customRequest: upload,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class AvatarUploader extends React.Component {
    render() {
        return (
            <Upload {...props}>
                <Button>
                    <Icon type="upload"/> 上传新头像
                </Button>
            </Upload>
        );
    }
}

export default AvatarUploader;