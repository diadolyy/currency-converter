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
function fetchHistoricalRates() {
    return __awaiter(this, arguments, void 0, function* (base = "USD", target = "EUR") {
        const url = `https://api.exchangerate.host/timeseries?start_date=${getDate(7)}&end_date=${getDate(0)}&base=${base}&symbols=${target}`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            return data.rates;
        }
        catch (error) {
            console.error("Ошибка загрузки данных", error);
            return null;
        }
    });
}
function getDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
}
export { fetchRates, fetchHistoricalRates };
