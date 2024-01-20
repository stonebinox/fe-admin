import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getClients } from "../utils/api";

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
  justify-content: start;
  align-items: center;
`;

const Button = styled.button`
  width: auto;
  min-width: 100px;
  height: auto;
  border: 0;
  outline: 0;
  background-color: #111;
  color: #efefef;
  text-align: center;
  font-size: 18px;
`;

const Dropdown = styled.select`
  margin-left: 16px;
  margin-right: 16px;
`;

const Link = styled.a`
  text-decoration: none;
`;

export const Navbar = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [storedProfile, setStoredProfile] = useState(null);

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
    if (!storedProfile && localStorage.getItem("profile")) {
      const profile = JSON.parse(localStorage.getItem("profile"));
      setStoredProfile(profile);
    }
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
