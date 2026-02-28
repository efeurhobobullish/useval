export const deposit = ({
  fullName,
  email,
  phone,
  currentBalance,
  amount,
  afterApproval,
  reference,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Wallet Funding Request — Useval</title>
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
      font-size: 20px;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
    }
    .content {
      padding: 32px 28px;
      color: #444;
    }
    .section {
      margin-bottom: 14px;
      font-size: 15px;
      color: #6B6C73;
      line-height: 1.6;
    }
    .section:last-of-type { margin-bottom: 0; }
    .label { font-weight: 600; color: #444; }
    .amount-box {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
      font-size: 15px;
      color: #444;
      border: 1px solid #ededed;
    }
    .amount-box div { margin-bottom: 8px; }
    .amount-box div:last-child { margin-bottom: 0; }
    .highlight {
      color: #eb2fde;
      font-weight: 700;
      font-size: 18px;
    }
    .reference {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #6B6C73;
    }
    .footer {
      text-align: center;
      background: #f9f9f9;
      padding: 20px 24px;
      font-size: 13px;
      color: #6B6C73;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Wallet Funding Request</h1>
    </div>
    <div class="content">
      <div class="section"><span class="label">User:</span> ${fullName}</div>
      <div class="section"><span class="label">Email:</span> ${email}</div>
      <div class="section"><span class="label">Phone:</span> ${phone}</div>
      <div class="amount-box">
        <div><span class="label">Current balance:</span> ₦${currentBalance}</div>
        <div><span class="label">Funding amount:</span> <span class="highlight">₦${amount}</span></div>
        <div><span class="label">Balance after approval:</span> ₦${afterApproval}</div>
      </div>
      <div class="reference">Reference: <strong>${reference}</strong></div>
    </div>
    <div class="footer">
      &copy; 2026 Useval. Admin notification.
    </div>
  </div>
</body>
</html>
  `;
};
