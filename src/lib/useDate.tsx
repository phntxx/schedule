import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { DateTime } from 'luxon';

export interface IUseDateProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
  timezone: string;
  setTimezone: Dispatch<SetStateAction<string>>;
}

export const useDate = (): IUseDateProps => {
  const [ date, setDate ] = useState<DateTime>(DateTime.now());
  const [ timezone, setTimezone ] = useState<string>("local");

  useEffect(() => {
    const id = setInterval(() => {
      setDate(DateTime.now());
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [timezone]);

  return { date, setDate, timezone, setTimezone };
}