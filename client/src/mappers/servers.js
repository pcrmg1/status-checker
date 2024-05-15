import { Server } from "../entities/servers.js";

/**
 * @param {import('../entities/servers.js').Server} apiData
 * @returns {import('../entities/servers.js').Server}
 */
export function fromDataToEntity(apiData) {
  return new Server(apiData.url, apiData.status);
}
