import React from 'react';
import { Media } from '@harvest-profit/npk';

function Example(props) {
  return (
    <Media>
      <Media left href="#">
        <Media
          object
          data-src="holder.js/64x64"
          alt="Generic placeholder image"
        />
      </Media>
      <Media body>
        <Media heading>Media heading</Media>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
        fringilla. Donec lacinia congue felis in faucibus.
      </Media>
    </Media>
  );
}

export default Example;
