class Datejs{
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
            return new Datejs(new Date(`${Years}-${Months}-${Days} ${Hours}:${Minutes}:${Seconds}:${MilliSeconds}`));
        } else {
            return new Datejs(new Date(string));
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
    
}