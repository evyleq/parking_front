import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <header className="header">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/pk/">Тюмень Парковки</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/pk/">Главная</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/pk/parkings">Парковки</NavLink>
                </NavItem>
                {/* <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Профиль
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem header>
                                            Имя
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Выйти
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>
    );
  }
}

export default Header;
