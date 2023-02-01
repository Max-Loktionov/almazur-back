const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken, name, surname, birthday) => {
  const mail = {
    to: email,
    subject: "Будь ласка, підтвердьте  реєстрацію",
    html: `<p>    При переході по цьому посиланню ви підтверджуєте реєстрацію ім'я:${name} прізвище: ${surname} дата народження:${birthday} в Almazur.</p>
    <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank"> Confirm Email Address</a> 
    <p>З повагою, Almazur group</p>
    `,
  };

  return mail;
};

module.exports = createVerifyEmail;
