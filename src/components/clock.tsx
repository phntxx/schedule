import styled from "@emotion/styled";

import { useEffect, useState } from 'react';
import { IUseDateProps } from '../lib/useDate';

import { displayFormat } from '../constants';

const Heading = styled.h1`
  margin: 0;
  padding: 0 1rem;
`;

export interface IClockProps {
  useDate: IUseDateProps;
}

export const Clock = ({ useDate }: IClockProps) => {

  const [ time, setTime ] = useState<String>("");

  useEffect(() => {
    setTime(useDate.date.setZone(useDate.timezone).toFormat(displayFormat))
  }, [ useDate.date, useDate.timezone ])

  return (
    <Heading>{time}</Heading>
  )
}