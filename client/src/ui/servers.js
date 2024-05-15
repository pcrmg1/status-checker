/** @param {import('../entities/servers').Server} server
 * @param {number} index
 */
export function createRow(server, index) {
  const $row = document.createElement("tr");

  const $th = document.createElement("th");
  $th.textContent = index;
  $row.appendChild($th);

  const $td = document.createElement("td");
  $td.textContent = server.url;
  $row.appendChild($td);

  const $td2 = document.createElement("td");
  $td2.innerHTML = `
  <span class="icon-text">
    <span>${server.status}</span>
    <span class="icon ${server.status === 200 ? "has-text-success" : "has-text-warning"}">
      <i class="fas fa-${server.status === 200 ? "check-square" : "exclamation-triangle"}"></i>
    </span>
  </span>`;
  $td2.className = "notification";
  $td2.classList.add("has-text-centered");
  $row.appendChild($td2);

  return $row;
}
