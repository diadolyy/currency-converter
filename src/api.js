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

export {fetchRates};