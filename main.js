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
  console.log("Hello here");
  console.log(await getData());
  console.log(await getData());
  console.log(await getData());

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

function showAdminPanelBlock() {
  removeAllChildren("app");
  document.getElementById("app").insertAdjacentHTML(
    "afterbegin",
    `
    <div id="adminPanelBlock">

    </div>
  `
  );
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
  showRegFormBlock();
  const signInResult = await auth();
  if (!signInResult) {
    showLoginFailureBlock();
    return;
  }

  await runProgram();
}
main();
