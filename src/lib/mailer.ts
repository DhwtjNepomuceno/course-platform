import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const expiration = new Date();
expiration.setMinutes(expiration.getMinutes() + 5);

function createTransport() {
  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  if (!smtpHost) return;

  const transporter = createTransport();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}

export async function sendResetMail(to: string) {
  console.log("Sending e-mail to:", to);

  const expiration = Date.now();

  console.log(process.env.URL_WEB);

  const link = `${process.env.URL_WEB}?expiration=${btoa((expiration + (5 * 60 * 1000)).toString())}&email=${to}`;

  await sendMail({
    to,
    subject: "Reset password link below",
    text: "We received a password reset request for your account. If you didn't request this, you can safely ignore this email. Click the button below to continue",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>

<body
  style="
    margin:0;
    padding:40px 0;
    background:#f4f4f4;
    font-family:Arial, Helvetica, sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td align="center">

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background:#ffffff;
            border-radius:16px;
            padding:40px;
          "
        >

          <tr>
            <td align="center">
              <img
                src="/assets/Excogitō.png"
                alt="Excogito"
                width="300"
              >
            </td>
          </tr>

          <tr>
            <td style="padding-top:40px;">
              <h1
                style="
                  margin:0;
                  font-size:38px;
                  color:#111111;
                "
              >
                Reset your password
              </h1>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding-top:24px;
                color:#555555;
                font-size:18px;
                line-height:1.7;
              "
            >
              We received a password reset request for your account.
              If you didn't request this, you can safely ignore this
              email.
              <br><br>
              Click the button below to continue.
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="padding-top:40px;"
            >

              <a
                href="${link}"
                style="
                  display:inline-block;
                  background:#3D5CFF;
                  color:#ffffff;
                  text-decoration:none;
                  font-size:18px;
                  font-weight:bold;
                  padding:16px 36px;
                  border-radius:12px;
                "
              >
                Reset password
              </a>

            </td>
          </tr>

          <tr>
            <td style="padding-top:50px;">

              <hr
                style="
                  border:none;
                  border-top:1px solid #dddddd;
                "
              >

              <p
                style="
                  margin-top:24px;
                  text-align:center;
                  color:#888888;
                  font-size:13px;
                  line-height:1.7;
                "
              >
                © 2026 <strong>Excogito</strong><br>
                This is an automated email. Please do not reply to this message.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
  });
}
