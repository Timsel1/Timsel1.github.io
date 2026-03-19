export function getPages<T>(items: T[], columns: number, rows: number): T[][] {
  const pageSize = columns * rows;
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages;
}
