const getStorage = localStorage.getItem('token');

const forQuestion = async () => {
  const API_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${getStorage}`;
  const response = await fetch(API_QUESTIONS);
  const data = await response.json();
  return data.results;
};

export default forQuestion;
