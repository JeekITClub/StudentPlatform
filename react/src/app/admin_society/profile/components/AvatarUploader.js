import React from 'react';
import {Upload, message, Button, Icon, notification} from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import Provider from '../../../../utils/provider';
import sampleImage from '../../../../static/sample.png';

const now = new Date();
let config = {
    headers: {'Content-Type': 'multipart/form-data'}
};

function beforeUpload(file) {
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
    return true;
}

function getCroppedImg(image, pixelCrop, fileName) {

    const canvas = document.getElementById('myCanvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            blob.name = fileName;
            resolve(blob);
        }, 'image/jpeg');
    });
}

class AvatarUploader extends React.Component {
    state = {
        uploading: false,
        imgUrl: '',
        crop: {
            x: 25,
            y: 25,
            aspect: 1,
            width: 50,
        }
    };

    upload = (params) => {
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
        console.log(pixelCrop);
        this.setState({crop, pixelCrop});
    };

    render() {
        const upload_props = {
            name: now.getTime().toString(),
            customRequest: this.upload,
            showUploadList: false,
            onChange: (info) => {
                console.log(info.file.status);
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
            beforeUpload: beforeUpload,
            disabled: this.state.uploading
        };

        return (
            <div>
                <h2>{this.state.imgUrl}</h2>
                <Upload {...upload_props}>
                    <Button loading={this.state.uploading}>
                        上传新头像
                    </Button>
                </Upload>
                <ReactCrop src={sampleImage}
                           onChange={this.onChange}
                           crop={this.state.crop}
                           keepSelection={true}/>
                <canvas id="myCanvas"/>
            </div>
        );
    }
}

export default AvatarUploader;