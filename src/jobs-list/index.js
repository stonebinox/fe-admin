import React from "react";
import styled from "styled-components";
import { Button, Subtitle } from "../common.styles";
import { payJob } from "../utils/api";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const JobsListContainer = styled.ul`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
  padding: 8px;
`;

export const JobsList = ({ jobsList, storedProfile }) => {
  const payClick = (jobId) =>
    payJob(storedProfile.id, jobId)
      .then((response) => response.json())
      .then((data) => {
        window.location.reload(true); // reloading the page to grab fresh balance and status in the interest of time
      })
      .catch((error) => console.log(error));

  return (
    <Container>
      <Subtitle>Jobs</Subtitle>
      {jobsList.map((job, i) => (
        <JobsListContainer key={i}>
          <li>
            <strong>Description: </strong>
            {job.description}
          </li>
          <li>
            <strong>Paid: </strong>
            {job.paid === true ? "Paid" : "Unpaid"}
          </li>
          <li>
            <strong>Price: </strong>
            {job.price}
          </li>
          <li>
            <strong>Payment date: </strong>
            {job.paymentDate || "-"}
          </li>
          <li>
            {job.paid !== true && storedProfile.balance >= job.price ? (
              <Button onClick={() => payClick(job.id)}>Pay</Button>
            ) : (
              ""
            )}
          </li>
        </JobsListContainer>
      ))}
    </Container>
  );
};
