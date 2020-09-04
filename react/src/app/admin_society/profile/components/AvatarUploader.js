import React from 'react';
import { Upload, message, Button, Modal, notification } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import * as PropTypes from 'prop-types';

import Provider from '../../../../utils/provider';

let config = {
  headers: { 'Content-Type': 'multipart/form-data' }
};

class AvatarUploader extends React.Component {
  state = {
    uploading: false,
    imgUrl: '',
    crop: {
      x: 0,
      y: 0,
      aspect: 1,
      width: 90
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
    this.setState({ file: file });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({
        imgUrl: reader.result,
        modalVisible: true
      });
    };
    return false;
  };

  upload = () => {
    this.setState({ confirmLoading: true });
    let data = new FormData();
    data.append('avatar', this.state.file);
    data.append('crop', JSON.stringify(this.state.pixelCrop));
    Provider.post('/api/society_manage/profile/upload_avatar/', data, config)
      .then((res) => {
        this.setState({
          modalVisible: false,
          confirmLoading: false
        });
        message.success('上传头像成功！');
        // TODO
        // this.props.getProfile();
      })
      .catch((err) => {
        this.setState({
          modalVisible: false,
          confirmLoading: false
        });
        message.error('上传头像失败！');
      });
  };

  // For the crop component to sync with state
  onCropChange = (crop, pixelCrop) => {
    this.setState({
      crop,
      pixelCrop
    });
  };

  cancelUpload = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    // more specific example of customRequest see:
    // https://github.com/react-component/upload/blob/master/examples/customRequest.js
    const uploadProps = {
      customRequest: this.upload,
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      disabled: this.state.modalVisible
    };

    return (
      <div>
        <Upload {...uploadProps}>
          <Button>
            上传新头像
          </Button>
        </Upload>
        <Modal
          title="裁剪头像"
          visible={this.state.modalVisible}
          onOk={this.upload}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.cancelUpload}
          okText="上传"
          cancelText="取消"
        >
          <ReactCrop src={this.state.imgUrl}
                     onChange={this.onCropChange}
                     crop={this.state.crop}
                     keepSelection={true}/>
        </Modal>
      </div>
    );
  }
}

// TODO
// AvatarUploader.propTypes = {
//     getProfile: PropTypes.func.isRequired
// };

export default AvatarUploader;
