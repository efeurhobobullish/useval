export const login = ({ name, code }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Useval — Verification</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #eb2fde 0%, #f59e0b 100%);
      font-family: 'Space Grotesk', 'Manrope', sans-serif;
      min-height: 100vh;
      padding: 40px 16px;
    }
    .wrapper {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.12);
    }
    .header {
      background: linear-gradient(135deg, #eb2fde 0%, #f59e0b 100%);
      text-align: center;
      padding: 28px 24px;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
    }
    .content {
      padding: 36px 28px;
      color: #444;
    }
    .content p {
      margin: 0 0 16px;
      line-height: 1.65;
      font-size: 15px;
      color: #6B6C73;
    }
    .content p:last-of-type { margin-bottom: 0; }
    .username { font-weight: 600; color: #444; }
    .code-box {
      margin: 28px 0;
      text-align: center;
      font-size: 28px;
      letter-spacing: 8px;
      font-weight: 700;
      color: #eb2fde;
      font-family: 'Space Grotesk', sans-serif;
    }
    .footer {
      text-align: center;
      background: #f9f9f9;
      padding: 20px 24px;
      font-size: 13px;
      color: #6B6C73;
    }
    .footer a {
      color: #eb2fde;
      font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Useval Verification</h1>
    </div>
    <div class="content">
      <p>Hi <span class="username">${name}</span> 👋,</p>
      <p>
        Use the verification code below to complete your login.
        This code expires in 5 minutes.
      </p>
      <div class="code-box">${code}</div>
      <p>If you did not request this code, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; 2026 Useval. All rights reserved.<br />
      <a href="https://useval.pxxl.click">useval.com</a>
    </div>
  </div>
</body>
</html>
  `;
};
