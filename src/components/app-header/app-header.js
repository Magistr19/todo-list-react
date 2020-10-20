import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header">
      <h1 className="app-header__title">Todo List</h1>
      <h2 className="app-header__sub-title">{toDo} more to do, {done} done</h2>
    </div>
  );
};

export default AppHeader;
