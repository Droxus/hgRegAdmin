import { getData, getBin } from "./db";

async function main() {
  console.log(await getData());
  console.log(await getData());
  console.log(await getData());

  console.log(await getBin());
  console.log(await getBin());
  console.log(await getBin());
}
main();
