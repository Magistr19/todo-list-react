import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    search: '',
    filter: 'All',
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  onSearch = (search) => {
    this.setState({
      search,
    });
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });

  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({
      filter,
    });
  }

  getDoneCount() {
    return this.state.todoData.filter((el) => el.done).length;
  }

  getTodoCount() {
    return this.state.todoData.length - this.getDoneCount();
  }

  render() {
    const {todoData, search, filter} = this.state;

    const sortedTodoBySearch = todoData.filter((item) => {
      if (!search.length) {
        return item;
      }

      return item.label.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const sortedTodo = sortedTodoBySearch.filter((item) => {
      switch (filter) {
        case 'All':
          return true;
        case 'Active':
          return item.done === false;
        case 'Done':
          return item.done === true;
      }
    });

    return (
        <div className="app">
          <AppHeader
              toDo={ this.getTodoCount() }
              done={ this.getDoneCount() }
          />
          <div className="app-panel">
            <SearchPanel onSearch={ this.onSearch }/>

            <ItemStatusFilter
                onFilterChange={ this.onFilterChange }
                filter={ filter }
            />
          </div>

          <TodoList
              todos={ sortedTodo }
              onDeleted={ this.deleteItem }
              onToggleImportant={ this.onToggleImportant }
              onToggleDone={ this.onToggleDone }
          />

          <ItemAddForm onItemAdded={ this.addItem} />
        </div>
    );
  }
};
