var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Chart } from 'chart.js';
export function renderExchangeChart(canvas) {
    return __awaiter(this, void 0, void 0, function* () {
        const endDate = new Date().toISOString().split('T')[0]; // сегодня
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 дней назад
            .toISOString()
            .split('T')[0];
        const url = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=USD&symbols=RUB`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            const labels = Object.keys(data.rates);
            const values = labels.map(date => data.rates[date]["RUB"]);
            new Chart(canvas, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Курс USD к RUB',
                            data: values,
                            fill: false,
                            borderColor: '#3e95cd',
                            // tension: 0.1,
                        },
                    ],
                },
            });
        }
        catch (error) {
            console.error('Ошибка при получении данных графика:', error);
        }
    });
}
export default renderExchangeChart;
