import { Component } from 'react';
import { GitHub, Instagram, LinkedIn } from '@material-ui/icons';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Rodrigo' };
    }
    render() {
        return (
            <div className="footer">
                <div className="footer__socials">
                    <ol>
                        <li><a rel="noreferrer" href="https://instagram.com/rodrigov03/" target="_blank"><Instagram/></a></li>
                        <li><a rel="noreferrer" href="https://linkedin.com/in/rodrigov03" target="_blank"><LinkedIn/></a></li>
                        <li><a rel="noreferrer" href="https://github.com/rodrigov03" target="_blank"><GitHub/></a></li>
                    </ol>
                </div>
                <div className="footer__copyright">2021 © Rodrigo Ventura</div>
            </div>
        )
    }
}
export default Footer;