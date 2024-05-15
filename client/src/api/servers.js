import { fromDataToEntity } from "../mappers/servers.js";

/** @returns {Promise<import('../entities/servers').Server[]>} */
export async function getServers() {
  try {
    const response = await fetch("http://localhost:8080");

    const data = await response.json();
    return data.data.servers.map((server) => fromDataToEntity(server));
  } catch (error) {
    console.log(error);
  }
}
