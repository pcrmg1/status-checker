import { getServers } from "./api/servers.js";
import { createRow } from "./ui/servers.js";

async function init() {
  const $tableBody = document.getElementById("table-body");
  $tableBody.innerHTML = "Cargando...";
  const servers = await getServers();

  $tableBody.innerHTML = "";
  servers.forEach((server) => {
    const $row = createRow(server, servers.indexOf(server) + 1);
    $tableBody.appendChild($row);
  });
}

init();

/** @type {HTMLButtonElement} */
const $refreshButton = document.querySelector("#refresh-button");

$refreshButton.addEventListener("click", async () => {
  init();
});
