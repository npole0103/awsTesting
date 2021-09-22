# awsTesting
AWS Node.js code test

---

[3. 서버구축하기 - http basic](https://javafa.gitbooks.io/nodejs_server_basic/content/chapter3.html)

[자바스크립트 클래스(생성자) 만드는 방법](https://webclub.tistory.com/136)

# Nodejs

### 기초 문법

```jsx

//변수
var name = "SuHeon"

//함수
function sum(a, b, c)
{
	return a + b + c;
}

//클래스
function Info(name, age)
{
	this.name = name;
	this.age = age;
	text = "hi";

	//맴버 함수
	this.print = () =>
	{
		console.log(name + " " + age + " " + text);
	}

}

//객체 생성
var myInfo = new Info("Kim", "24");

//this를 사용하지 않아서 text는 외부에서 참조 불가
console.log(myInfo.text);

myInfo.print();

//Property 예시
var person = {
 name: "Jason",
 age: 25,
 occupation: "Student",
 getPersonProfile: function() {
  return "Name : " + this.name +
   "\nAge : " + this.age +
   "\nOccupation : " + this.occupation;
 }
};
```

### main.js 서버구축 http

```jsx
// 1. 서버 사용을 위해서 http 모듈을 http 변수에 담는다.
var http = require('http'); 

// 2. http 모듈로 서버를 생성한다.
//    아래와 같이 작성하면 서버를 생성한 후, 사용자로 부터 http 요청이 들어오면 function 블럭내부의 코드를 실행해서 응답한다.
var server = http.createServer(function(request,response){ 

    response.writeHead(200,{'Content-Type':'text/html'});
    response.end('Hello node.js!!');

});

// 3. listen 함수로 8080 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
server.listen(8080, function(){ 
    console.log('Server is running...');
});
```

### GET 요청

```jsx
var http = require('http');

// 1. 요청한 url을 객체로 만들기 위해 url 모듈사용
var url = require('url');
// 2. 요청한 url 중에 Query String 을 객체로 만들기 위해 querystring 모듈 사용
var querystring = require('querystring'); 

var server = http.createServer(function(request,response){
    // 3. 콘솔화면에 로그 시작 부분을 출력
    console.log('--- log start ---');
    // 4. 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
    var parsedUrl = url.parse(request.url);
    console.log(parsedUrl);
    // 5. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
    var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    console.log(parsedQuery);
    // 6. 콘솔화면에 로그 종료 부분을 출력
    console.log('--- log end ---');

    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(
        `
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
            var1의값=${parsedQuery.var1}, var2의값=${parsedQuery.var2}, var3의값=${parsedQuery.var3}
        </body>
        </html>
        `
        );
});

server.listen(8080, function(){
    console.log('Server is running...');
});
```

### POST 요청

```jsx
var http = require('http');
var querystring = require('querystring');
var url = require('url');

var server = http.createServer(function (request, response) {

    var _url = request.url; //url에 request.url
    var queryData = url.parse(_url, true).query; //url 모듈에서 쿼리데이터 추출
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/input') {
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - SuHeonTest</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">SuHeonTest</a></h1>
 
          </html>
          <form action="http://127.0.0.1:8080/result" method="POST">
          <p>
              <input type="text" name="myname" placeholder="name">
          </p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>

        </body>
        `;

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);

    }
    else if (pathname === '/result') {
        // 1. post로 전달된 데이터를 담을 변수를 선언
        var postdata = '';
        // 2. request객체에 on( ) 함수로 'data' 이벤트를 연결
        request.on('data', function (data) {
            // 3. data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 저장
            postdata = postdata + data;
        });

        // 4. request객체에 on( ) 함수로 'end' 이벤트를 연결
        request.on('end', function () {
            // 5. end 이벤트가 발생하면(end는 한버만 발생한다) 3번에서 저장해둔 postdata 를 querystring 으로 객체화
            var parsedQuery = querystring.parse(postdata);
            var myname = parsedQuery.myname;
            var mydes = parsedQuery.description;
            // 6. 객체화된 데이터를 로그로 출력
            console.log(parsedQuery);
            // 7. 성공 HEADER 와 데이터를 담아서 클라이언트에 응답처리
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('myName : ' + myname + ' mydes : ' + mydes);
        });
    }
    else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end("Welcome");
    }
});

server.listen(8080, function () {
    console.log('Server is running...');
});
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17da799e-7496-45e9-9136-e24f72861385/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4efac2d4-0f1d-4d2a-a00b-b5610a345061/Untitled.png)

Post 방식으로 데이터를 전송.

---

### Module 사용

moduleTest.js

```jsx
var moduleTest = { //객체 생성
    html:(title, body) => {
      return `
      <!doctype html>
      <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">Module Test</a></h1>
        ${body}
      </body>
      </html>
      `;
    },
  
    naver: "NAVER"
  }

  module.exports = moduleTest;
```

main.js

```jsx
var mTest = require('./moduleTest');

// 1. 서버 사용을 위해서 http 모듈을 http 변수에 담는다.
var http = require('http');

// 2. http 모듈로 서버를 생성한다.
//    아래와 같이 작성하면 서버를 생성한 후, 사용자로 부터 http 요청이 들어오면 function 블럭내부의 코드를 실행해서 응답한다.
var server = http.createServer(function (request, response) {

    var html = mTest.html("hihi", `<a href="https://www.naver.com">${mTest.naver}</a>`);
    console.log("%s", html);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);

});

// 3. listen 함수로 8080 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
server.listen(8080, function () {
    console.log('Server is running...');
});
```

---

### 이벤트 처리

- EventEmitter : node.js 의 모든 이벤트처리가 정의된 기본객체입니다. 이벤트를 사용하기 위해서는 이 객체를 재정의해서 사용해야할 수 있습니다. `var EventEmitter = require('events');`
- on( ) : 이벤트를 연결하는 함수입니다. 이전장에서 request 객체에 on( ) 함수를 이용해서 'data'라는 이벤트를 캐치해서 사용했었는데 모든 이벤트처리는 이런 동일한 루틴을 거쳐서 사용하게 됩니다.
- emit( ) : 이벤트를 발생시키는 함수입니다. 위의 on( ) 함수에서 'data'라는 이벤트가 캐치되기 위해서는 emit('data') 의 형태로 이벤트를 발생시켜야 합니다.

eventTest.js

```jsx
var EventEmitter = require('events');

// 1. setInterval 함수가 동작하는 interval 값을 설정합니다. 1초에 한번씩 호출
var sec = 1;

// 2. timer변수를 EventEmitter 로 초기화
exports.timer = new EventEmitter();

// 3. javascript 내장함수인 setInterval 을 사용해서 1초에 한번씩 timer 객체에 tick 이벤트 발생
setInterval(() => {
    exports.timer.emit('tick');
}, sec*1000);

//이벤트 발생
//module.exports = timer;
```

main.js

```jsx
var mTest = require('./moduleTest');
// 1. 서버 사용을 위해서 http 모듈을 http 변수에 담는다.
var http = require('http');
var eventTest = require('./eventTest');

// 2. http 모듈로 서버를 생성한다.
//    아래와 같이 작성하면 서버를 생성한 후, 사용자로 부터 http 요청이 들어오면 function 블럭내부의 코드를 실행해서 응답한다.
var server = http.createServer(function (request, response) {

    // 1. module 내부에 선언된 timer객체를 통해 tick 이벤트를 캐치하고, 이벤트 발생시마다 현재시간을 출력
    eventTest.timer.on('tick', function (time) {
        var time = new Date(); // 2. 현재 시간을 가져오기 위한 Date 객체 생성
        console.log('now :' + time);
    });

    response.writeHead(200);
    response.end(); //쿼리 데이터 id값 가져옴.
});

// 3. listen 함수로 8080 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
server.listen(8080, function () {
    console.log('Server is running...');
});
```

---