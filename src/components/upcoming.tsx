import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { ISessionProps } from "../lib/useFetch";
import { IUseDateProps } from "../lib/useDate";

import { displayFormat } from "../constants";

export interface IUpcomingProps {
  sessions?: Array<ISessionProps>;
  useDate: IUseDateProps;
}

export interface IUpcomingEventProps {
  sessions: Array<ISessionProps>;
  useDate: IUseDateProps;
}

export const compare = (a: ISessionProps, b: ISessionProps) => {
  let currentDate = DateTime.now().toSeconds();
  let compare =
    a.date.toSeconds() - currentDate - (b.date.toSeconds() - currentDate);
  if (compare > 0) return 1;
  if (compare < 0) return -1;
  return 0;
};

export const Upcoming = ({ sessions, useDate }: IUpcomingProps) => (
  <>
    {sessions ? (
      <UpcomingEvent sessions={sessions} useDate={useDate} />
    ) : (
      <p>b</p>
    )}
  </>
);

export const UpcomingEvent = ({ sessions, useDate }: IUpcomingEventProps) => {
  let sessionsSorted = sessions.sort(compare);
  console.log(sessionsSorted);

  let session = sessionsSorted[0];

  let timeGap = session.date.toSeconds() - DateTime.now().toSeconds();

  const [time, setTime] = useState<DateTime>(session.date);

  useEffect(() => {
    setTime((oldTime) => oldTime.setZone(useDate.timezone));
  }, [useDate.timezone]);

  return (
    <p>
      Next Event: {session.title} at {time.toFormat(displayFormat)}
    </p>
  );
};
