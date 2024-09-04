import { getData, getBin, deleteForm, editForm } from "./db";

async function main() {
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
main();
