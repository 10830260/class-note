const fs = require("fs");
const path = require("path");

const mdFile = ".md";
const rootFolder = path.dirname(__dirname);
const rootfiles = fs.readdirSync(rootFolder);
const folders = rootfiles.filter(
  (item) => path.extname(item) != mdFile && item != ".vuepress"
);

module.exports = {
  title: "進階程式設計30808",
  description: "筆記",
  themeConfig: {
    logo: "https://buzzorange.com/techorange/app/uploads/2021/07/3130.png",
    navbar: [...getNavBar()],
    sidebar: { ...getSideBar() },
  },
};

function getNavBar() {
  const navbar = [];
  folders.forEach((folder) => {
    navbar.push({
      text: folder.toUpperCase(),
      link: `/${folder}/`,
    });
  });
  return navbar;
}

function getSideBar() {
  const sidebar = {};
  folders.forEach((folder) => {
    sidebar[`/${folder}/`] = [];
    const folderFiles = fs.readdirSync(path.join(rootFolder, folder));
    const children = [];
    folderFiles
      .filter((item) => item.toLowerCase() != "readme.md")
      .forEach((file) => {
        children.push(`/${folder}/${file}`);
      });
    sidebar[`/${folder}/`].push({
      text: folder.toUpperCase(),
      children: [`/${folder}/`, ...children],
    });
  });
  return sidebar;
}
