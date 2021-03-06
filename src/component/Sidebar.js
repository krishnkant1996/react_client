import React from 'react';
import {ListItem,ListItemText,ListItemIcon} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import {Settings,People as PeopleIcon,} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const Sidebar = (
  <div>
    <ListItem button component={Link} to="/react_client/">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/react_client/setting">
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Setting"  />
    </ListItem>
    <ListItem button component={Link} to="/react_client/profile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile"  />
    </ListItem>
    
  </div>
);

