import styled from '@emotion/styled'

import { useEffect, useState } from "react";
import { DateTime } from 'luxon';

import { ISessionProps } from "../lib/useFetch";
import { IUseDateProps } from '../lib/useDate';

import { displayFormat } from "../constants";

export interface IEventListProps {
  sessions?: Array<ISessionProps>;
  useDate: IUseDateProps;
}

export interface IEventProps {
  session: ISessionProps;
  useDate: IUseDateProps;
}

const EventContainer = styled.div`
  border: 1px solid black;
  border-radius: 0;
  padding: 1rem;
  margin: 1rem 0;
`;

export const EventList = ({ sessions, useDate}: IEventListProps) => (
  <>
  { sessions ? sessions.map((session: ISessionProps) => (
    <Event key={`session-${session.number}`}session={session} useDate={useDate} />
  )) : <></>}
  </>
)

export const Event = ({ session, useDate }: IEventProps) => {

  const [time, setTime] = useState<DateTime>(session.date)

  useEffect(() => {
    setTime(oldTime => oldTime.setZone(useDate.timezone))
  }, [useDate.timezone, session.number])

  return (
    <EventContainer>
    <h1>{session.title}</h1>
    <h2>{time.toFormat(displayFormat)}</h2>
    <h3>No. {session.number} | By {session.speaker}</h3>
    <p>{session.abstract}</p>
    </EventContainer>
  )
}