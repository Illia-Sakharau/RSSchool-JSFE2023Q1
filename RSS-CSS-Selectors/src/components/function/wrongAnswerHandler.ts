export default () => {
  const wrongAnswer = new Event('wrongAnswer');
  document.dispatchEvent(wrongAnswer);
};
