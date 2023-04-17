import fs from "fs";

export const get = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file + ".json", "utf8", (err, content) => {
      //recibe un callback por ser asincronico
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(content));
    });
  });
};

export const save = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file + ".json", JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
