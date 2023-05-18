export default function winGame(level, clicks, times) {
  const resultsList = JSON.parse(localStorage.getItem('ily-results'));
  const resultValue = {
    level: level,
    clicks: clicks,
    times: times,
  };

  resultsList.push(resultValue);
  if (resultsList.length > 10) {
    resultsList.shift();
  }

  localStorage.setItem('ily-results', JSON.stringify(resultsList))





  setTimeout(() => {
    window.alert("You Win! Play again!");
    location.reload();
  }, 500)
  
  
}


