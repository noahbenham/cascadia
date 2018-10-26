import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import classNames from 'classnames/bind';
import ContentContainer from 'terra-content-container';
import { messages } from './aggregated-translations/en'; // Import aggregated translations for English
import GameSearch from './GameSearch';
import styles from './App.scss';

const cx = classNames.bind(styles);

export default class App extends Component {
  render() {
    const header = <div className={cx('header')}>Twitch Game Search</div>;

    return (
      <IntlProvider locale="en" messages={messages}>
        <ContentContainer header={header} fill>
          <GameSearch />
        </ContentContainer>
      </IntlProvider>
    );
  }
}
