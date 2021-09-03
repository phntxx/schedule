import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

import { useDate as useDateHook } from './lib/useDate';
import useFetch from './lib/useFetch';

import { Clock } from './components/clock';
import { Select } from './components/select';
import { EventList } from './components/event';

const AppContainer = styled.div`
padding: 1rem;
@media (min-width: 766px) {
  max-width: 30%;
}
`;

const Container = styled.div`
  display: flex;
`;

const App = () => {
  
  const useDate = useDateHook();
  const { sessionData } = useFetch();

  return (
    <>
    <Global
      styles={css`
        body {
          font-family: "Work Sans", sans-serif;
        }
        #root {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        html,
        body,
        #root {
          height: 100%;
          width: 100%;
          margin: 0;
        }
      `}
    />
    <AppContainer>
      <Container>
        <Select useDate={useDate} />
        <Clock useDate={useDate} />
      </Container>
      <EventList sessions={sessionData} useDate={useDate} />
    </AppContainer> 
    </>
  )
}

export default App;
