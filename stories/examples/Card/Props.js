import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardTitle,
  CardFooter,
  CardText,
} from '@harvest-profit/npk';
import Props from '../Props';

function Example() {
  return (
    <Props
      components={[
        Card,
        CardBody,
        CardHeader,
        CardFooter,
        CardImg,
        CardSubtitle,
        CardTitle,
        CardText,
      ]}
    />
  );
}

export default Example;
