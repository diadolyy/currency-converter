import { fetchRates } from "./api.js";

document.addEventListener("DOMContentLoaded", async function() {
    const amountInput= document.getElementById("amount");
    const fromCurrency= document.getElementById("fromCurrency");
    const  toCurrency=document.getElementById("toCurrency");
    const resultElement=document.getElementById("result");

    // Загружаем курсы валют
    const rates=await fetchRates();
    console.log(rates);
    if(!rates) return;

    // Заполняем списки валют
    Object.keys(rates).forEach(currency=>{
        fromCurrency.innerHTML+=`<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML+=`<option value="${currency}">${currency}</option>`;

    });

    // функция конвертации
    function convertCurrency(){
        const amount=parseFloat(amountInput.value);
        const from=fromCurrency.value;
        const to=toCurrency.value;

        if(!amount || !from || !to) return;

        const rate=rates[to] / rates[from];
        const convertedAmount=(amount*rate).toFixed(2);
        resultElement.textContent=convertedAmount;
    }

    // Отслеживаем изменения
    amountInput.addEventListener("input", convertCurrency);
    fromCurrency.addEventListener("change", convertCurrency);
    toCurrency.addEventListener("change", convertCurrency);
    
})