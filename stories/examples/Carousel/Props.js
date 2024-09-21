import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from '@harvest-profit/npk';
import Props from '../Props';

function Example() {
  return (
    <Props
      components={[
        Carousel,
        CarouselItem,
        CarouselControl,
        CarouselIndicators,
        CarouselCaption,
      ]}
    />
  );
}

export default Example;
