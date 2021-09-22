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