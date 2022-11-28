export class weatherObject {
    constructor(
        public date: String, 
        public country: String,
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