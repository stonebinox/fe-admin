const baseUrl = "http://localhost:3001";

export const getClients = () => fetch(`${baseUrl}/profiles`);
