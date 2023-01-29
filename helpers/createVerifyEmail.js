const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Будь ласка, підтвердьте свою пошту",
    html: `<p>    При переході по цьому посиланню ви підтверджуєте свою пошту при реєстрації в Almazur.</p>
    <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank"> Confirm Email Address</a> 
    <p>З повагою, Almazur group</p>
    `,
  };

  return mail;
};

module.exports = createVerifyEmail;
