import DataBase from "./db.js";

async function main() {
  const db = new DataBase();

  if (!(await db.checkUserLoginStatus())) {
    setTimeout(async () => {
      const authResult = await db.signInWithGoogle();

      if (!authResult) return;
    }, 5000);
  }

  await db.updateData();
  console.log("Data: ", db.data);
  console.log("Bin: ", db.bin);
}
main();
