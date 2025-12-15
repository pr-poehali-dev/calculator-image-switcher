# Интеграция калькулятора с Tilda

## Способ 1: Встраивание через iframe

1. В редакторе Tilda добавьте блок **T123 "HTML-код"**
2. Вставьте следующий код:

```html
<iframe 
  src="https://ВАШ_ДОМЕН/widget" 
  width="100%" 
  height="700" 
  frameborder="0"
  style="border: none; border-radius: 16px; overflow: hidden;"
></iframe>
```

3. Замените `ВАШ_ДОМЕН` на ваш реальный домен проекта
4. Сохраните и опубликуйте страницу

---

## Способ 2: Встраивание напрямую (полный HTML + CSS + JS)

1. В редакторе Tilda добавьте блок **T123 "HTML-код"**
2. Вставьте код ниже:

```html
<div id="loan-calculator-widget"></div>

<style>
  #loan-calculator-widget {
    font-family: 'Open Sans', sans-serif;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .calculator-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  
  .calculator-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #1A1F2C;
    text-align: center;
    margin-bottom: 32px;
  }
  
  .calc-field {
    margin-bottom: 24px;
  }
  
  .calc-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
  }
  
  .calc-label-text {
    font-size: 18px;
    font-weight: 600;
    color: #1A1F2C;
  }
  
  .calc-value {
    font-size: 24px;
    font-weight: 700;
    color: #1A1F2C;
  }
  
  .calc-slider {
    width: 100%;
    height: 8px;
    border-radius: 8px;
    background: #E8EBF5;
    outline: none;
    -webkit-appearance: none;
  }
  
  .calc-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #0066FF;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);
  }
  
  .calc-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #0066FF;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);
  }
  
  .calc-range {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 14px;
    color: #8A898C;
  }
  
  .calc-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .calc-result-box {
    background: linear-gradient(135deg, #F5F5FA 0%, #E8EBF5 100%);
    padding: 20px;
    border-radius: 16px;
  }
  
  .calc-result-label {
    font-size: 12px;
    color: #8A898C;
    margin-bottom: 8px;
  }
  
  .calc-result-value {
    font-size: 24px;
    font-weight: 700;
    color: #1A1F2C;
  }
  
  .calc-highlight {
    color: #FFD93D;
    background: rgba(255, 217, 61, 0.2);
    padding: 4px 16px;
    border-radius: 12px;
    display: inline-block;
  }
  
  .calc-strike {
    text-decoration: line-through;
    font-size: 18px;
    color: #8A898C;
    display: block;
    margin-bottom: 4px;
  }
  
  .calc-button {
    width: 100%;
    padding: 20px;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 12px;
  }
  
  .calc-button-primary {
    background: #0066FF;
    color: white;
    box-shadow: 0 4px 16px rgba(0, 102, 255, 0.3);
  }
  
  .calc-button-primary:hover {
    background: #0052CC;
    transform: scale(1.02);
  }
  
  .calc-button-secondary {
    background: white;
    color: #1A1F2C;
    border: 2px solid #FFD93D;
  }
  
  .calc-button-secondary:hover {
    background: rgba(255, 217, 61, 0.1);
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    .calculator-card {
      padding: 20px;
    }
    
    .calculator-title {
      font-size: 24px;
    }
    
    .calc-results {
      grid-template-columns: 1fr;
    }
    
    .calc-value {
      font-size: 20px;
    }
  }
</style>

<script>
(function() {
  const container = document.getElementById('loan-calculator-widget');
  
  let amount = 10000;
  let days = 10;
  
  function calculateReturn() {
    const rate = 0.02;
    return Math.round(amount + amount * rate * (days / 10));
  }
  
  function formatNumber(num) {
    return num.toLocaleString('ru-RU');
  }
  
  function formatDate(daysFromNow) {
    const date = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  function render() {
    const returnAmount = calculateReturn();
    
    container.innerHTML = `
      <div class="calculator-card">
        <h2 class="calculator-title">Калькулятор займов</h2>
        
        <div class="calc-field">
          <div class="calc-label">
            <span class="calc-label-text">Сумма</span>
            <span class="calc-value">${formatNumber(amount)} ₽</span>
          </div>
          <input 
            type="range" 
            class="calc-slider" 
            id="amount-slider"
            min="1000" 
            max="50000" 
            step="1000" 
            value="${amount}"
          />
          <div class="calc-range">
            <span>1 000 ₽</span>
            <span>50 000 ₽</span>
          </div>
        </div>
        
        <div class="calc-field">
          <div class="calc-label">
            <span class="calc-label-text">Срок</span>
            <span class="calc-value">${days} дней</span>
          </div>
          <input 
            type="range" 
            class="calc-slider" 
            id="days-slider"
            min="5" 
            max="30" 
            step="1" 
            value="${days}"
          />
          <div class="calc-range">
            <span>5 дней</span>
            <span>30 дней</span>
          </div>
        </div>
        
        <div class="calc-results">
          <div class="calc-result-box">
            <div class="calc-result-label">Возвращаете</div>
            <span class="calc-strike">${formatNumber(returnAmount)} ₽</span>
            <div class="calc-result-value calc-highlight">${formatNumber(amount)} ₽</div>
          </div>
          <div class="calc-result-box">
            <div class="calc-result-label">Дата возврата</div>
            <div class="calc-result-value">${formatDate(days)}</div>
          </div>
        </div>
        
        <button class="calc-button calc-button-primary">
          Получить через госуслуги
        </button>
        <button class="calc-button calc-button-secondary">
          Получить бесплатно
        </button>
      </div>
    `;
    
    document.getElementById('amount-slider').addEventListener('input', (e) => {
      amount = parseInt(e.target.value);
      render();
    });
    
    document.getElementById('days-slider').addEventListener('input', (e) => {
      days = parseInt(e.target.value);
      render();
    });
  }
  
  render();
})();
</script>
```

3. Сохраните и опубликуйте страницу

---

## Рекомендации

- **Способ 1 (iframe)** — проще в использовании, автоматически обновляется при изменениях
- **Способ 2 (прямой код)** — полностью независимый виджет, работает без внешних зависимостей

## Настройка кнопок

Чтобы кнопки выполняли действия, добавьте обработчики в конец скрипта:

```javascript
// После render() добавьте:
document.querySelectorAll('.calc-button').forEach(button => {
  button.addEventListener('click', () => {
    // Ваш код обработки клика
    console.log('Сумма:', amount, 'Дней:', days);
    // Например, открыть форму или отправить данные
  });
});
```

---

## Поддержка

Если возникнут вопросы по интеграции — обращайтесь!
