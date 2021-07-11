const getLog = async () => {
  const apiResponse = await fetch('http://localhost:9000/api/log');
  const jsonResponse = await apiResponse.json();
  return jsonResponse;
}

export default getLog;