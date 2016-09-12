import React from 'react';

import readme from '../../README.md';

const IMG_URL = require('../images/relax.jpg');

export default class ReadMe extends React.Component {
  constructor(props) {
    super(props);
  }

  /* eslint-disable */
  render() {
    return (
      <div>
        <img style={{marginBottom: '20px', width: '330px'}} src={IMG_URL} alt="relax" />
        <div dangerouslySetInnerHTML={{__html: readme}} />
      </div>
    );
  }
  /* eslint-disable */
}