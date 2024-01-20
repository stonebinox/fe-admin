import { useState } from "react";
import styled from "styled-components";

import { Navbar } from "./navbar";
import { Deposit } from "./deposit";

const Layout = styled.div`
  width: 100%;
  height: auto;
  max-width: 1280px;
  margin: 0 auto;
`;

function App() {
  const [storedProfile, setStoredProfile] = useState(null);

  return (
    <Layout>
      <Navbar
        storedProfile={storedProfile}
        setStoredProfile={setStoredProfile}
      />
      {storedProfile && <Deposit storedProfile={storedProfile} />}
    </Layout>
  );
}

export default App;
