import React, { Component } from 'react';
import classNames from 'classnames/bind';
import SlidePanel from 'terra-slide-panel';
import SearchField from 'terra-search-field';
import Image from 'terra-image';
import SelectableList from 'terra-list/lib/SelectableList';
import IconUnknown from 'terra-icon/lib/icon/IconUnknown';
import * as api from './api';
import styles from './GameSearch.scss';

const cx = classNames.bind(styles);

export default class App extends Component {
  state = { gameResults: [], isLoading: false };

  searchChange = (searchText) => {
    this.setState({ isLoading: true });
    api.searchGames(searchText).then((response) => {
      this.setState({ gameResults: response.data.games, isLoading: false });
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
          <h2>{selectedGame.name}</h2>
          <Image src={selectedGame.box.large} />
          <p className={cx('popularity')}>
            {selectedGame.popularity.toLocaleString()}
            {' '}
            viewers
          </p>
        </>
      );
    } else {
      panelContent = (
        <>
          <h3>No game selected</h3>
          <IconUnknown height={30} width={30} />
        </>
      );
    }

    const listItems = this.state.gameResults.map(game => (
      <SelectableList.Item content={<p className={cx('game-row')}>{game.name}</p>} key={game.id} />
    ));

    let listContent;
    if (this.state.isLoading) {
      listContent = <p className={cx('align-center')}>Loading...</p>;
    } else {
      listContent = (
        <SelectableList
          onChange={this.handleListSelection}
          selectedIndexes={[this.state.selectedIndex]}
        >
          {listItems}
        </SelectableList>
      );
    }

    const mainContent = (
      <div className={cx('container')}>
        <p>Search for your favorite games in the search box below. Click on their name to find out more information about them.</p>
        <div className={cx('search-field')}>
          <SearchField
            onSearch={this.searchChange}
            searchDelay={500}
          />
        </div>
        {listContent}
      </div>
    );

    return (
      <SlidePanel
        panelContent={<div className={cx(['panel-content', 'align-center'])}>{panelContent}</div>}
        mainContent={mainContent}
        isOpen
        fill
        panelPosition="end"
        panelBehavior="squish"
      />
    );
  }
}
