import React from 'react';
import DrawerMenu from "../../../shared/DrawerMenu/DrawMenu";
import {Link} from "react-router-dom";

class AdminSocietyDrawerMenu extends React.Component {
    render() {
        return (
            <DrawerMenu title="社团管理">
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
            </DrawerMenu>
        );
    }
}

export default AdminSocietyDrawerMenu;