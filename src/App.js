// import 'bulma/css/bulma.css'
import RouterSetup from './RouterSetup';
import styled from 'styled-components';

function App() {
  return (
    <>
      <Wrapper>
        <RouterSetup />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display:flex;
 
`