import * as XLSX from 'xlsx/xlsx.mjs';
import findLmd from './main';

export async function writeToExcel(nMax, kMax) {
  const lmdList = []
  const cols = []
  for (let k = 2; k <= kMax; k++) {
    const rows = {}
    rows['label'] = `Cn(1,${k})`
    for (let n = 5; n <= nMax; n++) {
      if (!rows[`n${n}`]) {
        rows[`n${n}`] = `${findLmd(n, [1,k])[1].toString()}`
      }
    }
    lmdList.push(rows)
  }
  console.log('lmdlist',lmdList)
  for (let i = 5; i <= nMax; i++) {
    cols.push(`n${i}`)
  }

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(lmdList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lmd List");

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [["Cn(1,k) \\ n", ...cols]], { origin: "A1" });

  /* calculate column width */
  const max_width = 10;
  worksheet["!cols"] = [ { wch: max_width },{ wch: max_width },{ wch: max_width } ];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, "LmdList.xlsx", { compression: true });
}