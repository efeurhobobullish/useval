export const welcome = ({ name }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Useval</title>
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
    .content h2 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 700;
      color: #444;
      font-family: 'Space Grotesk', sans-serif;
    }
    .content p {
      margin: 0 0 16px;
      line-height: 1.7;
      font-size: 15px;
      color: #6B6C73;
    }
    .content p:last-of-type { margin-bottom: 0; }
    .username { font-weight: 600; color: #444; }
    .cta {
      text-align: center;
      margin: 32px 0;
    }
    .cta a {
      display: inline-block;
      background: linear-gradient(135deg, #eb2fde 0%, #f59e0b 100%);
      color: #ffffff;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 15px;
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
      <h1>Welcome to Useval 🎉</h1>
    </div>
    <div class="content">
      <h2>Hello <span class="username">${name}</span>,</h2>
      <p>Your account has been successfully verified and you're now part of the Useval community.</p>
      <p>You can now access your dashboard, fund your wallet, and explore all available services.</p>
      <div class="cta">
        <a href="https://useval.pxxl.click/home">Go to Dashboard</a>
      </div>
      <p>If you ever need help, our support team is always ready to assist you.</p>
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
