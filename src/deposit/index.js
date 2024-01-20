import React, { useState } from "react";
import styled from "styled-components";

import { Button, Subtitle } from "../common.styles";
import { depositAmount } from "../utils/api";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Amount = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  margin-right: 8px;
  margin-left: 8px;
  box-shadow: 0px 2px 2px #888;
  transition: all 0.2s ease;
  text-align: center;
  padding: 2px;
  color: #111;

  &:hover {
    box-shadow: 0px 0px 8px #888;
    color: #ffa500;
  }
`;

const amounts = [1, 5, 10, 50, 100, 500];

export const Deposit = ({ storedProfile }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const amountClick = (amount) => {
    setSelectedAmount(amount);
  };

  const depositClick = () => {
    depositAmount(selectedAmount, storedProfile.id)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          window.location.reload(true); // forces a refresh to grab fresh data from the BE; not ideal but this is a tech challenge with a time-limit
        }
      })
      .catch((error) => {
        console.log(error);

        if (error?.error) {
          alert(error?.error); // displays the error
        }
      });
  };

  return (
    <Container>
      <Subtitle>Select deposit amount</Subtitle>
      {amounts.map((amount, i) => (
        <Amount key={i} onClick={() => amountClick(amount)}>
          {amount}
        </Amount>
      ))}
      {selectedAmount && (
        <Button onClick={depositClick} style={{ marginLeft: "16px" }}>
          Deposit {selectedAmount}
        </Button>
      )}
    </Container>
  );
};
