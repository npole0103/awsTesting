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