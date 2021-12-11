import { useCallback, useEffect, useState } from "react";
import { DateTime } from 'luxon';
import { readRemoteFile } from 'react-papaparse';

import { importFormat } from "../constants";

export interface ISessionProps {
  date: DateTime;
  number: number;
  title: string;
  speaker: string;
  abstract: string;
}

export interface ISessionDataProps {
  date: string;
  number: number;
  title: string;
  speaker: string;
  abstract: string;
}

export const compare = (a: ISessionProps, b: ISessionProps) => {
  let compare = a.date.toSeconds() - b.date.toSeconds();
  if (compare > 0) return 1
  if (compare < 0) return -1
  return 0
}

export const handleResponse = (response: Response) => {
  if (response.ok) {
    console.log(response.text());
    return response.text();}
  throw new Error("Error fetching session data");
};

const useFetch = () => {
  const [sessionData, setSessionData] = useState<Array<ISessionProps>>([]);

  const callback = useCallback(() => {

    const config = {
      download: true,
      header: true,
      dynamicTyping: true,
    }

    readRemoteFile("/data/sessions.csv", {
      ...config,
      complete: (res) => {

        let results = res.data as ISessionDataProps[];
        results.forEach((result) => {

          let session: ISessionProps = {
            ...result, date: DateTime.fromFormat(result.date, importFormat)
          };
          
          setSessionData(data => [...data, session]);
        })

        setSessionData(data => data.sort(compare))
      }
    })
  }, []);

  useEffect(() => callback(), [callback]);

  return {
    sessionData,
    callback
  };
};

export default useFetch;