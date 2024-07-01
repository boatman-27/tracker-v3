export default function formatDate(originalDateString) {
  const originalDate = new Date(originalDateString);

  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
