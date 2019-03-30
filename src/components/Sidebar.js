import React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = (props) => {
  return (
    <Menu>
        <h2>Location finder</h2>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/location/school" activeClassName="is-active">School</NavLink>
        <NavLink to="/location/college" activeClassName="is-active">College</NavLink>
    </Menu>
  );
};

export default Sidebar;