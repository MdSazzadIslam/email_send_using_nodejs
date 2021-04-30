const nodemailer = require("nodemailer");

//const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  SENDER_MAIL,
  SENDER_MAIL_PASSWORD,
} = process.env;

const sendEmail = async (to, url, txt) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_MAIL,
      pass: SENDER_MAIL_PASSWORD,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: SENDER_MAIL,
    to: to,
    subject: "Email using Nodemailer",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the mail example.</h2>
            <p>Congratulations! 
                Done.
            </p>
            
         
            </div>
        `,
  };

  await smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
