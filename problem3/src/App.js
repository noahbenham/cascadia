import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import classNames from 'classnames/bind';
import SlidePanel from 'terra-slide-panel';
import { messages } from './aggregated-translations/en'; // Import aggregated translations for English

class App extends Component {
  render() {
    return (
      <IntlProvider locale="en" messages={messages}>
        <SlidePanel
          panelContent={<div>panel</div>}
          mainContent={<div>main</div>}
          isOpen
          fill
          panelPosition="end"
          panelBehavior="squish"
        />
      </IntlProvider>
    );
  }
}

export default App;
