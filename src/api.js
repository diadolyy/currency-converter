const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

async function fetchRates(){
    try{
        const response=await fetch(API_URL);
        const data=await response.json();
        return data.rates;
    }catch(error){
        console.error("Ошибка загрузки данных", error);
        return null;
    }
}




async function fetchHistoricalRates(base = "USD", target = "EUR") {
    const url = `https://api.exchangerate.host/timeseries?start_date=${getDate(7)}&end_date=${getDate(0)}&base=${base}&symbols=${target}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("Ошибка загрузки данных", error);
        return null;
    }
}

function getDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
}

export {fetchRates, fetchHistoricalRates};