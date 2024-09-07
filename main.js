import {
  getData,
  getBin,
  deleteForm,
  editForm,
  signInWithGoogle,
  checkUserLoginStatus,
} from "./db";

async function auth() {
  return new Promise(async (resolve) => {
    if (!(await checkUserLoginStatus())) {
      document
        .querySelector("#signInBtn")
        .addEventListener("click", async () =>
          resolve(await signInWithGoogle())
        );
    } else {
      resolve(true);
    }
  });
}

async function runProgram() {
  showAdminPanelBlock();
  // console.log("Hello here");
  // console.log(await getData());
  // console.log(await getData());
  // console.log(await getData());

  // console.log(await getBin());
  // console.log(await getBin());
  // console.log(await getBin());

  // await deleteForm("R8YkvMDkGrmCIcx1PU6C");
  // await editForm("R8YkvMDkGrmCIcx1PU6C", {
  //   name: "MyName",
  //   message: "Cool form",
  // });

  // console.log(await getData());
  // console.log(await getData());
  // console.log(await getData());
}

function removeAllChildren(id) {
  const parentElement = document.getElementById(id);
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

let openedPopup;
function openPopup(event) {
  event.stopPropagation();
  const row = event.target.parentElement;
  if (!row.id) {
    return;
  }

  // console.log(row);
  openedPopup = row.id;
  document.getElementById("popupTextarea").value = JSON.stringify(
    allData[row.id],
    null,
    2
  );
  document.getElementById("popup").style.display = "flex";
}

let allData = {};
async function addRows() {
  const data = await getData();
  // const services = data.services;
  const advancedService = data.services.advanced;
  const basicService = data.services.basic;
  const ultraService = data.services.ultra;
  const othersService = data.services.others;

  allData = Object.assign(
    {},
    advancedService,
    basicService,
    ultraService,
    othersService
  );

  Object.entries(allData).forEach(([key, value], index) => {
    // console.log(key, value);
    document.getElementsByClassName("table")[0].insertAdjacentHTML(
      "beforeend",
      `
        <div class="table-row" id="${key}">
          <div class="table-cell">${index + 1}</div>
          <div class="table-cell">${value.name ?? "-"}</div>
          <div class="table-cell">${value.surname ?? "-"}</div>
          <div class="table-cell">${value.phone ?? "-"}</div>
          <div class="table-cell">${value.email ?? "-"}</div>
            <div class="table-cell">${"05.09.2024"}</div>
      </div>  
    `
    );
  });

  Array.from(document.getElementsByClassName("table-row")).forEach((rowBtn) => {
    // console.log(rowBtn);
    rowBtn.addEventListener("click", (event) => {
      // console.log(event);
      openPopup(event);
    });
  });
}

function showAdminPanelBlock() {
  removeAllChildren("app");
  document.getElementById("app").insertAdjacentHTML(
    "beforeend",
    `
    <div id="adminPanelBlock">
      <div class="table">
        <!-- Header Row -->
        <div class="table-row header">
            <div class="table-cell">№</div>
            <div class="table-cell">Имя</div>
            <div class="table-cell">Фамилия</div>
            <div class="table-cell">Телефон</div>
            <div class="table-cell">Почта</div>
            <div class="table-cell">Дата</div>
        </div>
      </div>
      <div id="popup">
        <div id="popupContainer">
          <div>
          <button id="closePopupBtn">Close</button>
          <button id="deletePopupBtn">Delete</button>
          <button id="editPopupBtn">Edit</button>
          <label></label>
          </div>
          <textarea id="popupTextarea">
          </textarea>
        </div>
      </div>
    </div>
  `
  );

  document.getElementById("closePopupBtn").addEventListener("click", () => {
    location.reload();
    document.getElementById("popup").style.display = "none";
  });

  document
    .getElementById("deletePopupBtn")
    .addEventListener("click", async () => {
      await deleteForm(openedPopup);
      document.getElementById("popup").style.display = "none";
      location.reload();
    });

  document
    .getElementById("editPopupBtn")
    .addEventListener("click", async () => {
      await editForm(
        openedPopup,
        JSON.parse(document.getElementById("popupTextarea").value)
      );
    });

  addRows();
}

function showRegFormBlock() {
  removeAllChildren("app");
  document.getElementById("app").insertAdjacentHTML(
    "afterbegin",
    `
    <div id="regFormBlock">
      <button id="signInBtn">Sign In</button>
    </div>
  `
  );
}

function showLoginFailureBlock() {
  removeAllChildren("app");
  document.getElementById("app").insertAdjacentHTML(
    "afterbegin",
    `
    <div id="loginFailureBlock">
      <label id="loginFailureLbl">Access to this page is denied</label>
    </div>
  `
  );
}

async function main() {
  // showRegFormBlock();
  // const signInResult = await auth();
  // if (!signInResult) {
  //   showLoginFailureBlock();
  //   return;
  // }

  await runProgram();
}
main();
