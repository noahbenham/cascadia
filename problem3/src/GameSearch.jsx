import React, { Component } from 'react';
import classNames from 'classnames/bind';
import SlidePanel from 'terra-slide-panel';
import SearchField from 'terra-search-field';
import * as api from './api';

export default class App extends Component {
  state = { gameResults: [] };

  searchChange = (searchText) => {
    api.searchGames(searchText).then((response) => {
      this.setState({ gameResults: response.data.games });
    });
  }

  render() {
    const panelContent = (
      <div>panel content</div>
    );

    const mainContent = (
      <>
        <SearchField
          onSearch={this.searchChange}
          searchDelay={500}
        />
        {this.state.gameResults.map(game => game.name).join(', ')}
      </>
    );

    return (
      <SlidePanel
        panelContent={panelContent}
        mainContent={mainContent}
        isOpen
        fill
        panelPosition="end"
        panelBehavior="squish"
      />
    );
  }
}
