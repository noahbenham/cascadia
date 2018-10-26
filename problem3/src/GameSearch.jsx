import React, { Component } from 'react';
import classNames from 'classnames/bind';
import SlidePanel from 'terra-slide-panel';
import SearchField from 'terra-search-field';
import Image from 'terra-image';
import SelectableList from 'terra-list/lib/SelectableList';
import * as api from './api';
import styles from './GameSearch.scss';

const cx = classNames.bind(styles);

export default class App extends Component {
  state = { gameResults: [] };

  searchChange = (searchText) => {
    api.searchGames(searchText).then((response) => {
      this.setState({ gameResults: response.data.games });
    });
  }

  handleListSelection = (event, selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    const selectedGame = this.state.selectedIndex >= 0
      && this.state.gameResults[this.state.selectedIndex];

    let panelContent;
    if (selectedGame) {
      panelContent = (
        <>
          <h3>{selectedGame.name}</h3>
          <Image src={selectedGame.box.large} />
          <p className={cx('popularity')}>
            {selectedGame.popularity.toLocaleString()}
            {' '}
            viewers
          </p>
        </>
      );
    } else {
      panelContent = <p>No game selected!</p>;
    }

    const listItems = this.state.gameResults.map(game => (
      <SelectableList.Item content={<p>{game.name}</p>} key={game.id} />
    ));

    const mainContent = (
      <div className={cx('container')}>
        <p>Search for your favorite games in the search box below. Click on their name to find out more information about them.</p>
        <div className={cx('center')}>
          <SearchField
            onSearch={this.searchChange}
            searchDelay={500}
          />
        </div>
        {listItems && (
          <SelectableList onChange={this.handleListSelection} selectedIndexes={[this.state.selectedIndex]}>
            {listItems}
          </SelectableList>
        )}
      </div>
    );

    return (
      <SlidePanel
        panelContent={<div className={cx('panel')}>{panelContent}</div>}
        mainContent={mainContent}
        isOpen
        fill
        panelPosition="end"
        panelBehavior="squish"
      />
    );
  }
}
