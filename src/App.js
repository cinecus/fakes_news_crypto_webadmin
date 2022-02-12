// import 'bulma/css/bulma.css'
import RouterSetup from './RouterSetup';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';

function App() {
  return (
    <>
      <Layout>
        <RouterSetup />
      </Layout>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display:flex;
 
`