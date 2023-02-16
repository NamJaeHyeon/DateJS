class DateJS{
    constructor(date){
        this.date = date || new Date();
        this.years = this.date.getFullYear();
        this.months = this.date.getMonth()+1;
        this.days = this.date.getDate();
        this.week = this.date.getDay();
        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
        this.milliseconds = +this.date%1000;
    }
    static monthName = ['Jan', 'Fab', 'Apr', 'Mar', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
    static monthFullName = ['January', 'Fabuary', 'April', 'March', 'May', 'June', 'July', 'Agust', 'September', 'October', 'November', 'December']
    static week = "월화수목금토일";
    static ThanksgivingDay = {
        2023:[9, 28],
        2024:[9, 16],
        2025:[10, 5],
        2026:[9, 24],
        2027:[9, 14],
        2028:[10, 2],
    };
    static NewYearHoliDay = {
        2023:[1, 22],
        2024:[2, 10],
        2025:[1, 29],
        2026:[2, 17],
        2027:[2, 7],
        2028:[1, 27],
    }
    static parse(string, form){
        let Years = '2000';
        let Months = '01';
        let Days = '01';
        let Hours = '00';
        let Minutes = '00';
        let Seconds = '00';
        let MilliSeconds = '00';

        let pointer1 = 0, pointer2 = 0;
        if(form){
            let limit = form.length;
            while(limit > pointer2){
                if(form[pointer2] === '%'){
                    let d = form[pointer2+1];
                    if(d === 'Y'){
                        Years = string.slice(pointer1,pointer1+4);
                        pointer1 += 4;
                        pointer2 += 2;
                    } else if(d === 'M'){
                        Months = string.slice(pointer1,pointer1+2);
                        pointer1 += 2;
                        pointer2 += 2;
                    } else if(d === 'D'){
                        Days = string.slice(pointer1,pointer1+2);
                        pointer1 += 2;
                        pointer2 += 2;
                    } else if(d === 'H'){
                        Hours = string.slice(pointer1,pointer1+2);
                        pointer1 += 2;
                        pointer2 += 2;
                    } else if(d === 'm'){
                        Minutes = string.slice(pointer1,pointer1+2);
                        pointer1 += 2;
                        pointer2 += 2;
                    } else if(d === 'S'){
                        Seconds = string.slice(pointer1,pointer1+2);
                        pointer1 += 2;
                        pointer2 += 2;
                    } else if(d === 'X'){
                        MilliSeconds = string.slice(pointer1,pointer1+3);
                        pointer1 += 3;
                        pointer2 += 2;
                    } else {
                        pointer1++;
                        pointer2++;
                    }
                } else {
                    pointer1++;
                    pointer2++;
                }
            }
            return new DateJS(new Date(`${Years}-${Months}-${Days} ${Hours}:${Minutes}:${Seconds}:${MilliSeconds}`));
        } else {
            return new DateJS(new Date(string));
        }
    }
    format(form, map){
        let result = '';
        let handle = 1;
        if(!map) map = (x) => ('00'+x).slice(-2);
        for(let i = 0; i < form.length; i++){
            if(handle){
                if(form[i] === '%'){
                    handle = 0;
                } else {
                    result += form[i];
                }
            } else {
                if(form[i] === 'Y'){
                    result += this.years;
                } else if (form[i] === 'M'){
                    result += map(this.months);
                } else if (form[i] === 'D'){
                    result += map(this.days);
                } else if (form[i] === 'W'){
                    result += map(this.week);
                } else if (form[i] === 'H'){
                    result += map(this.hours);
                } else if (form[i] === 'm'){
                    result += map(this.minutes);
                } else if (form[i] === 'S'){
                    result += map(this.seconds);
                } else if (form[i] === 'X'){
                    result += ('0000'+this.milliseconds).slice(-4);
                } else {
                    result += '%' + form[i];
                }
                handle = 1;
            }
        }
        return result;
    }
    isStaturday(){
        if(this.week === 6) return true;
        else return false;
    }
    isWeekday(){
        if(this.week && (this.week < 6)) return true;
        return false;
    }
    isHoliday(){
        let holiday = [
            [1, 1],
            [3, 1],
            [4, 8],
            [5, 5],
            [6, 6],
            [8, 15],
            [10, 3],
            [10, 9],
            [12, 25]
        ];
        let newYear = DateJS.NewYearHoliDay[this.years]
        holiday.push(newYear);
        holiday.push([newYear[0], newYear[1]+1]);
        let thanksDay = DateJS.ThanksgivingDay[this.years];
        holiday.push(thanksDay);
        holiday.push([thanksDay[0], thanksDay[1]+1]);
        holiday.push([thanksDay[0], thanksDay[1]+2]);
        return holiday.some(x => x[0] === this.months && x[1] === this.days);
    }
}
