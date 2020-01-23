import React from 'react';

import AvatarUploader from "../components/AvatarUploader";
import SocietyProfileForm from "../components/SocietyProfileForm";

import AdminSocietyStore from "../../stores/AdminSocietyStore";

class SocietyProfile extends React.Component {
  componentDidMount() {
    AdminSocietyStore.getProfile();
  }

  render() {
    return (
      <>
        <SocietyProfileForm/>
        <AvatarUploader/>
      </>
    )
  }
}

export default SocietyProfile;