import React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = (props) => {
  return (
    <Menu>
        <img src="https://img.icons8.com/dusk/128/000000/map.png"/>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/location/school" activeClassName="is-active">Schools</NavLink>
        <NavLink to="/location/college" activeClassName="is-active">Colleges</NavLink>
        <NavLink to="/location/bank" activeClassName="is-active">Banks</NavLink>
        <NavLink to="/location/park" activeClassName="is-active">Parks</NavLink>
        <NavLink to="/location/auto" activeClassName="is-active">Auto</NavLink>
        <NavLink to="/search" activeClassName="is-active">Search</NavLink>
    </Menu>
  );
};

export default Sidebar;