import React from 'react';
import {Upload, message, Button, Modal, notification} from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import Provider from '../../../../utils/provider';

const now = new Date();
let config = {
    headers: {'Content-Type': 'multipart/form-data'}
};


class AvatarUploader extends React.Component {
    state = {
        uploading: false,
        imgUrl: '',
        crop: {
            x: 25,
            y: 25,
            aspect: 1,
            width: 50,
        },
        modalVisible: false,
        confirmLoading: false
    };

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG && !isPNG) {
            message.error('只能上传.jpg或者.png文件！');
            return false;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('文件大小不能超过5MB！');
            return false;
        }
        this.setState({file: file});
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({imgUrl: reader.result, modalVisible: true})
        };
        return true;
    };

    upload = (params) => {
        console.log(params);
        const file = params.file;
        let data = new FormData();
        data.append('avatar', file);
        data.append('crop', JSON.stringify(this.state.pixelCrop));
        Provider.post('/api/society_manage/profile/upload_avatar/', data, config)
            .then((res) => {
                this.setState({uploading: false});
                message.success('上传成功！')
            })
            .catch((err) => {
                this.setState({uploading: false});
                console.log(err)
            })
    };

    onChange = (crop, pixelCrop) => {
        console.log(crop);
        this.setState({crop, pixelCrop});
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const upload_props = {
            name: now.getTime().toString(),
            customRequest: this.upload,
            showUploadList: false,
            onChange: (info) => {
                if (info.file.status === 'uploading') {
                    this.setState({uploading: true});
                }
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            beforeUpload: this.beforeUpload,
            disabled: this.state.uploading,
            onSuccess: () => {console.log('Success!')}
        };

        return (
            <div>
                <Upload {...upload_props}>
                    <Button loading={this.state.uploading}>
                        上传新头像
                    </Button>
                </Upload>
                <Modal
                    title="裁剪头像"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <ReactCrop src={this.state.imgUrl}
                               onChange={this.onChange}
                               crop={this.state.crop}
                               keepSelection={true}/>
                </Modal>

            </div>
        );
    }
}

export default AvatarUploader;