import { Component } from 'react';
import { GitHub, Instagram } from '@material-ui/icons';
import './style.css';

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Rodrigo' };
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__logo">LOG</div>
                <div className="sidebar__socials">
                    <ol>
                        <li><GitHub/></li>
                        <li><Instagram/></li>
                    </ol>
                </div>
            </div>
        )
    }
}
export default Sidenav;