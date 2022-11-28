export class savedForecast {
    constructor(
        public id: number,
        public country: String,
        public date: String,
        public region: String,
        public accuTemp: number,
        public accuPrec: number,
        public openWthTemp: number,
        public openWthPrec: number,
        public wthApiTemp: number,
        public wthApiPrec: number
    ) {

    }
}