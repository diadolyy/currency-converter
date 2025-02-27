var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchRates, fetchNews } from "./api.js";
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const amountInput = document.getElementById("amount");
        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");
        const resultElement = document.getElementById("result");
        // Загружаем курсы валют
        const rates = yield fetchRates();
        console.log(rates);
        if (!rates)
            return;
        // Заполняем списки валют
        Object.keys(rates).map(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
        // функция конвертации
        function convertCurrency() {
            const amount = parseFloat(amountInput.value);
            const from = fromCurrency.value;
            const to = toCurrency.value;
            if (!amount || !from || !to)
                return;
            const rate = rates[to] / rates[from];
            const convertedAmount = (amount * rate).toFixed(2);
            resultElement.textContent = convertedAmount;
        }
        // Отслеживаем изменения
        amountInput.addEventListener("input", convertCurrency);
        fromCurrency.addEventListener("change", convertCurrency);
        toCurrency.addEventListener("change", convertCurrency);
        // вывод новостей на экран
        function displayNews() {
            return __awaiter(this, void 0, void 0, function* () {
                const newsList = document.getElementById("newsList");
                const articles = yield fetchNews();
                console.log(articles);
                if (articles.length == 0) {
                    newsList.innerHTML = '<li>Новостей не найдено</li>';
                    return;
                }
                newsList.innerHTML = ''; //очищение предыдущих новостей
                articles.forEach((article) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
            <a href="${article.url}" target="_blank">${article.title}</a>
            <p>${article.description || "Нет описания"}</p>
            `;
                    newsList.appendChild(li);
                });
            });
        }
        displayNews();
        const refreshNewsButton = document.getElementById("refreshNews");
        refreshNewsButton.addEventListener("click", displayNews);
    });
});
