import React from 'react';
import { IntlProvider } from 'react-intl';
import classNames from 'classnames/bind';
import ContentContainer from 'terra-content-container';
import Image from 'terra-image';
import { messages } from './aggregated-translations/en'; // Import aggregated translations for English
import GameSearch from './GameSearch';
import styles from './App.scss';

const cx = classNames.bind(styles);

export default function App() {
  const header = (
    <div className={cx('header')}>
      <Image src="/glitch_white.svg" height="22" width="22" className={cx('twitch-logo')} />
      Twitch Game Search
    </div>
  );

  return (
    <IntlProvider locale="en" messages={messages}>
      <ContentContainer header={header} fill>
        <GameSearch />
      </ContentContainer>
    </IntlProvider>
  );
}
