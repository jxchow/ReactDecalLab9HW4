import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState) => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1,
    }));
  }

  clearCompletedItems() {
    let copy = [...this.state.items];
    let result = copy.filter(item => item.isCompleted == false);
    this.setState({
          items: result
        })
  }

  increaseSessionsCompleted(itemId) {
    let copy = [...this.state.items];
    for(let i = 0; i < copy.length; i++) {
        if(copy[i].id === itemId) {
          copy[i].sessionsCompleted += 1; 
        }
    }
    this.setState({
          items: copy
        })
  }

  toggleItemIsCompleted(itemId) {
    let copy = [...this.state.items];
    for(let i = 0; i < copy.length; i++) {
        if(copy[i].id === itemId) {
          copy[i].isCompleted = !copy[i].isCompleted; 
        }
    }
    this.setState({
          items: copy
        })
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id,
      });
  }

  render() {
    let areItemsMarkedAsCompleted = false;
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      // areItemsMarkedAsCompleted,
    } = this.state;
    let copy = this.state.items;
    for(let i = 0; i < copy.length; i++) {
        if(copy[i].isCompleted === true) {
          areItemsMarkedAsCompleted = true;
        }
    }
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton 
              onClick={this.clearCompletedItems} 
            />}
          </header>
          {this.state.items.length == 0 &&
          <EmptyState/>}
          {sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => {this.increaseSessionsCompleted(itemIdRunning)}}
              autoPlays
              key={itemIdRunning}
            />}
            <div className="items-container">
              {this.state.items.map((item) => (
                <TodoItem
                  description={item.description}
                  sessionsCompleted={item.sessionsCompleted}
                  isCompleted={item.isCompleted}
                  startSession={() => this.startSession(item.id)}
                  toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                  key={item.id}/>))}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
