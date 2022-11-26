import * as XLSX from 'xlsx/xlsx.mjs';
import findLmd from './main';

export async function writeToExcel(nMax, kMax) {
  const lmdList = []
  const cols = []
  for (let k = 2; k <= kMax; k++) {
    const rows = {}
    rows['label'] = `Cn(1,${k})`
    for (let n = 5; n <= nMax; n++) {
      if (k == 2) {
        if (n % 4 == 2 || n % 4 == 3) {
          rows[`n${n}`] = 2
        } else if (n % 4 == 0) {
          rows[`n${n}`] = 3
        } else {
          rows[`n${n}`] = 4
        }
      }
      if (k == 3) {
        if (n % 2 == 0) {
          rows[`n${n}`] = 1
        } else {
          rows[`n${n}`] = 2
        }
      }
      if (2*k + 1 == n) {
        rows[`n${n}`] = 4
      }
      if (n % 2 == 0 && k % 2 == 1) {
        rows[`n${n}`] = 1
      }
      if (!rows[`n${n}`]) {
        rows[`n${n}`] = findLmd(n, [1,k])[1].length
      }
    }
    lmdList.push(rows)
  }
  console.log('lmdlist',lmdList)
  for (let i = 5; i <= nMax; i++) {
    cols.push(`n_${i}`)
  }
  // /* fetch JSON data and parse */
  // const url = "https://sheetjs.com/data/executive.json";
  // const raw_data = await (await fetch(url)).json();

  // /* filter for the Presidents */
  // const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

  // /* flatten objects */
  // const rows = prez.map(row => ({
  //   "nama": row.name.first + " " + row.name.last,
  //   "ultah": row.bio.birthday
  // }));

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(lmdList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lmd List");

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [["Cn(1,k) \\ n", ...cols]], { origin: "A1" });

  /* calculate column width */
  const max_width = 7;
  worksheet["!cols"] = [ { wch: max_width },{ wch: max_width },{ wch: max_width } ];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, "LmdList.xlsx", { compression: true });
}