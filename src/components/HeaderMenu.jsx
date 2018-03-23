import React, { Component } from 'react';
import { Container, Divider, Dropdown, Header, Menu } from 'semantic-ui-react'
import '../styles/HeaderMenu.css';

class HeaderMenu extends Component {
    
    render(){
        return(
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a'>
                            Rafa Notes
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        )
    }
}

export default HeaderMenu;