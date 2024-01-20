const baseUrl = "http://localhost:3001";

export const getClients = () => fetch(`${baseUrl}/profiles`);

export const depositAmount = (amount, profileId) =>
  fetch(`${baseUrl}/balances/deposit/1`, {
    method: "POST",
    body: JSON.stringify({
      amount,
    }),
    headers: new Headers({
      profile_id: profileId,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  });

export const getProfile = (profileId) =>
  fetch(`${baseUrl}/profile`, {
    headers: new Headers({
      profile_id: profileId,
    }),
  });
