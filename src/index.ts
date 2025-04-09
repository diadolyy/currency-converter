import { fetchRates, fetchHistoricalRates } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
  const amountInput = <HTMLInputElement>document.getElementById("amount");
  const fromCurrency = <HTMLSelectElement>(
    document.getElementById("fromCurrency")
  );
  const toCurrency = <HTMLSelectElement>document.getElementById("toCurrency");
  const resultElement = <HTMLElement>document.getElementById("result");

  // Загружаем курсы валют
  const rates = await fetchRates();
  console.log(rates);
  if (!rates) return;

  // Заполняем списки валют
  Object.keys(rates).map((currency) => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  // функция конвертации
  function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || !from || !to) return;

    const rate = rates[to] / rates[from];
    const convertedAmount = (amount * rate).toFixed(2);
    resultElement.textContent = convertedAmount;
  }

  // Отслеживаем изменения
  amountInput.addEventListener("input", convertCurrency);
  fromCurrency.addEventListener("change", convertCurrency);
  toCurrency.addEventListener("change", convertCurrency);

  // вывод новостей на экран
  interface NewsArticle {
    title: string;
    link: string;
    pubDate: string;
  }

  async function fetchFinancialNews(): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        "https://newsdata.io/api/1/news?apikey=pub_79380ae94951956d26e9541fd1c25352f3042&language=ru&category=business"
      );
      const data = await response.json();

      if (Array.isArray(data.results)) {
        return data.results;
      } else {
        console.error("Неверный формат данных:", data);
        return [];
      }
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
      return [];
    }
  }

  async function displayNews(): Promise<void> {
    const news = await fetchFinancialNews();
    const newsList = document.getElementById(
      "newsList"
    ) as HTMLUListElement | null;

    if (!newsList) return;

    newsList.innerHTML = ""; // очищаем список

    news.slice(0, 5).forEach((article: NewsArticle) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <a href="${article.link}" target="_blank">${article.title}</a>
            <p>${article.pubDate.split(" ")[0]}</p>
          `;
      newsList.appendChild(li);
    });
  }

  displayNews();

  // Запускаем обновление каждые 10 минут
setInterval(displayNews, 10*60*1000);

  const refreshNewsButton = <HTMLButtonElement>(
    document.getElementById("refreshNews")
  );
  refreshNewsButton.addEventListener("click", displayNews);
});

// Вызываем после выбора валют
