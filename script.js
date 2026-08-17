// script.js – calculator logic with responsive handling
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');

let screenValue = '';

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let buttonText = e.target.innerText;
    
    // map display symbols to JS operators
    if (buttonText === '×') {
      buttonText = '*';
    } else if (buttonText === '÷') {
      buttonText = '/';
    } else if (buttonText === '−') {
      buttonText = '-';
    }

    // clear
    if (buttonText === 'C') {
      screenValue = '';
      screen.value = '';
      return;
    }

    // evaluate
    if (buttonText === '=') {
      try {
        // replace % with /100 for proper percentage
        let expr = screenValue.replace(/%/g, '/100');
        // evaluate safely
        const result = Function('"use strict"; return (' + expr + ')')();
        screen.value = result;
        screenValue = String(result);
      } catch (error) {
        screen.value = 'Error';
        screenValue = '';
      }
      return;
    }

    // append pressed button to expression
    screenValue += buttonText;
    screen.value = screenValue;
  });
});

// optional: handle keyboard events (bonus)
document.addEventListener('keydown', (e) => {
  const key = e.key;
  const validKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','%','(',')','Enter','Backspace','Escape'];
  if (validKeys.includes(key)) {
    e.preventDefault();
    if (key === 'Enter') {
      document.querySelector('button:last-child')?.click();
      return;
    }
    if (key === 'Backspace') {
      screenValue = screenValue.slice(0, -1);
      screen.value = screenValue;
      return;
    }
    if (key === 'Escape') {
      document.querySelector('button:contains("C")')?.click();
      return;
    }
    // find matching button and click it
    const btn = document.querySelector(`button:not(:empty)`);
    // we simulate by directly calling logic
    const mapped = { '*':'×', '/':'÷', '-':'−' };
    let displayKey = mapped[key] || key;
    const targetBtn = Array.from(buttons).find(b => b.innerText === displayKey);
    if (targetBtn) targetBtn.click();
  }
});