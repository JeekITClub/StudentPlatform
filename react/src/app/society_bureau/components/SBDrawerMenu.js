import React from 'react';

import DrawMenu from '../../../shared/DrawerMenu/DrawMenu.js';
import {Link} from "react-router-dom";

class SBDrawerMenu extends React.Component {
    render() {
        return (
            <DrawMenu title="社团部管理">
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
                <Link to={'/'}><p>233</p></Link>
            </DrawMenu>
        )
    }
}

export default SBDrawerMenu;