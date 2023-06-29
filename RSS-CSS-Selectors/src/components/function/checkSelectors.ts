export default function (html: string, checkedSelectors: string | null): boolean {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(html, 'text/xml');
  const correctAnswer = xmlDoc.querySelectorAll('[data-target="true"]');
  if (!checkedSelectors) {
    return false;
  }
  if (checkedSelectors === '[data-target="true"]') {
    alert(`Don't cheat, please!`);
    return false;
  }
  const enteredAnswer = xmlDoc.querySelectorAll(checkedSelectors);

  if (JSON.stringify(correctAnswer) !== JSON.stringify(enteredAnswer)) {
    return false;
  }

  return true;
}
