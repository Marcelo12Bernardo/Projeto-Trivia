const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const fetchTokenAPI = async () => {
  const response = await fetch(URL_TOKEN);
  const data = await response.json();
  return data;
};

export default fetchTokenAPI;
