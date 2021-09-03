import styled from '@emotion/styled';
import { options, IOptionProps } from '../constants';
import { IUseDateProps } from '../lib/useDate';


const Selector = styled.select`
  -webkit-appearance: button;
  -moz-appearance: button;
  text-transform: uppercase;
  font-family: Work Sans, sans-serif;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 0;
  color: black;
  background: none;

  & > option {
    background-color: white;
  }
`;

export interface ISelectProps {
  useDate: IUseDateProps;
}

export const Select = ({ useDate }: ISelectProps) => {

  const onChange = (event: any) => {
    if (event.target.value) useDate.setTimezone(event.target.value)
  }

  return (
    <Selector onChange={(e) => onChange(e)}>

      { options.map(({ key, value }: IOptionProps) => (
        <option key={`option-${key.toLowerCase()}`} value={value}>{key}</option>
      ))}

    </Selector>
  )
}