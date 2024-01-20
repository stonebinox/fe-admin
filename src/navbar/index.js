import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getClients, getProfile } from "../utils/api";
import { Button } from "../common.styles";

const Container = styled.div`
  width: 100%;
  border-bottom: 2px solid #ffa500;
  padding: 8px;
`;

const Title = styled.h3`
  text-align: center;
`;

const OptionsContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Dropdown = styled.select`
  margin-left: 16px;
  margin-right: 16px;
`;

const Link = styled.a`
  text-decoration: none;
`;

export const Navbar = ({ storedProfile, setStoredProfile }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const getClientsList = async () => {
      getClients()
        .then((response) => response.json())
        .then((data) => {
          setClients(data);
        })
        .catch((error) => console.log(error));
    };

    getClientsList();
  }, []);

  useEffect(() => {
    const fetchFreshAccount = (id) =>
      getProfile(id)
        .then((response) => response.json())
        .then((data) => setStoredProfile(data))
        .catch((error) => {
          // something wrong, we log the profile out
          console.log(error);
          logoutClick();
        });

    if (!storedProfile && localStorage.getItem("profile")) {
      const profile = JSON.parse(localStorage.getItem("profile"));
      setStoredProfile(profile);

      fetchFreshAccount(profile.id); // to ensure we grab the latest data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedProfile]);

  const loginClick = () => {
    if (!selectedClient || selectedClient === "select") return;

    const profile = clients.find(
      (client) => parseInt(client.id, 10) === parseInt(selectedClient, 10)
    );

    localStorage.setItem("profile", JSON.stringify(profile));
    setStoredProfile(profile);
  };

  const logoutClick = () => {
    localStorage.removeItem("profile");
    setSelectedClient(null);
    setStoredProfile(null);
  };

  return (
    <Container>
      <OptionsContainer>
        {!storedProfile ? (
          <>
            <Title>Select Client</Title>
            {clients.length > 0 ? (
              <Dropdown
                onChange={(e) => setSelectedClient(e.currentTarget.value)}
              >
                <option value="select">Select</option>
                {clients.map((client, i) => (
                  <option key={i} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </Dropdown>
            ) : (
              "No clients to show"
            )}
            {selectedClient && selectedClient !== "select" && (
              <Button onClick={loginClick}>Login</Button>
            )}
          </>
        ) : (
          <Title>
            Welcome, {storedProfile.firstName} {storedProfile.lastName} &bull;
            Balance: {parseFloat(storedProfile.balance).toFixed(2)} &bull;{" "}
            <Link href="#" onClick={logoutClick}>
              Logout
            </Link>
          </Title>
        )}
      </OptionsContainer>
    </Container>
  );
};
