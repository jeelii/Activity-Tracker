const getLog = async () => {
  const apiResponse = await fetch('http://localhost:9000/api/log');
  const jsonResponse = await apiResponse.json();
  return jsonResponse.sort((a, b) => a.date < b.date ? 1 : -1);
}

export default getLog;