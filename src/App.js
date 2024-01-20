import styled from "styled-components";
import { Navbar } from "./navbar";

const Layout = styled.div`
  width: 100%;
  height: auto;
  max-width: 1280px;
  margin: 0 auto;
`;

function App() {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
}

export default App;
