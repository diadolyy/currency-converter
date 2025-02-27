var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
function fetchRates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const data = yield response.json();
            return data.rates;
        }
        catch (error) {
            console.error("Ошибка загрузки данных", error);
            return null;
        }
    });
}
function fetchNews() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = "7ce82925c44946b78f3a7d04bd9c9891";
        const url = "https://newsapi.org/v2//v2/top-headlines?&apiKey=7ce82925c44946b78f3a7d04bd9c9891";
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (data.status !== 'ok') {
                throw new Error('Не удалось загрузить новости');
            }
            return data.articles;
        }
        catch (error) {
            console.error('Ошибка при получении новостей', error);
            return [];
        }
    });
}
export { fetchNews };
export { fetchRates };
