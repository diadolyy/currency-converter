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

async function fetchNews(){
    const apiKey= "7ce82925c44946b78f3a7d04bd9c9891";
    const url=`https://newsapi.org/v2/everything?q=currency&apiKey=${apiKey}`;

    try{
        const response=await fetch(url);
        const data= await response.json();

        if(data.status !== 'ok'){
            throw new Error('Не удалось загрузить новости');
        }

        return data.articles;
    }catch(error){
        console.error('Ошибка при получении новостей', error);
        return [];
    }
}

export {fetchNews};
export {fetchRates};