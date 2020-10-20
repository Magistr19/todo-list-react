import React from 'react';

import './todo-list-item.css';

export default function TodoListItem ({ label, onDeleted, onToggleImportant, onToggleDone, done, important }) {
    function getClassNames() {
        let baseClass = 'todo-list-item'

        if (done) {
            baseClass += ' todo-list-item--done';
        }

        if (important) {
            baseClass += ' todo-list-item--important';
        }

        return baseClass;
    }

    return (
        <div className={ getClassNames()} >
            <span
              className="todo-list-item__label"
              onClick={ onToggleDone }
            >
              { label }
            </span>

            <button
                type="button"
                className="btn btn-outline-success btn-sm float-right todo-list-item__btn"
                onClick={ onToggleImportant }
            >
              <i className="fa fa-exclamation" />
            </button>

            <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right todo-list-item__btn"
                onClick={ onDeleted }
            >
              <i className="fa fa-trash-o" />
            </button>
        </div>
    );
}

