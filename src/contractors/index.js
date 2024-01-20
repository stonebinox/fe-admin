import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getContractorJobs, getContractors } from "../utils/api";
import { Button, Subtitle } from "../common.styles";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #ffa500;
`;

const OptionsContainer = styled.select`
  margin-left: 16px;
  margin-right: 16px;
`;

export const Contractors = ({ storedProfile }) => {
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getContractorsForClient = () =>
      getContractors(storedProfile.id)
        .then((response) => response.json())
        .then((data) => {
          setContractors(data);
        })
        .catch((error) => console.log(error));

    getContractorsForClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueClick = () => {
    if (!selectedContractor) return;

    getContractorJobs(storedProfile.id, selectedContractor)
      .then((response) => response.json())
      .then((data) => setJobs(jobs))
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Subtitle>Pay jobs for</Subtitle>
      {contractors.length > 0 && (
        <OptionsContainer
          onChange={(e) => setSelectedContractor(e.currentTarget.value)}
        >
          <option value="select">Select</option>
          {contractors.map((contractor, i) => (
            <option key={i} value={contractor.id}>
              {contractor.firstName} {contractor.lastName}
            </option>
          ))}
        </OptionsContainer>
      )}
      {selectedContractor && selectedContractor !== "select" && (
        <Button onClick={continueClick}>Continue &gt;</Button>
      )}
    </Container>
  );
};
