# DateJS
new date class including format

**이 코드의 차별점!**    
- **공휴일 판정 메서드**
- **milliseconds까지 조종 프린트 가능**


```
%Y : 연도
%M : 개월 수
%D : 날 수
%W : 요일
%H : 시
%M : 분
%S : 초
%X : 밀리초
```

```
let nowDate = new DateJS();
nowDate.format('현재 시간 : %Y-%M-%D(%W) %H:%m:%S:%X'); // 현재 시간 : 2023-02-17(금) 03:01:07:969
nowDate.format('현재 시간 : %Y-%M-%D(%W) %H:%m:%S:%X', x=>x); // 현재 시간 : 2023-2-17(금) 3:1:7:969

let newDate = DateJS('2023-02-17 03:01:07:969'); // 같음
let DateJS.parse('17-02-2022 969:07:01:03','%D-%M-%Y %X:%S:%m:%Y') // 같음
DateJS.parse('2023-03-01').isHoliday() // 3.1절 공휴일 true
```
