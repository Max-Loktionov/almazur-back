const { BASE_URL } = process.env;

const createCheckingEmail = (userEmail, checkingToken, newData) => {
  const mail = {
    to: "studreno@ex.ua", // here is email of the admin
    subject: "Шановний адміне, будь ласка, підтвердьте дані для реєстрації",
    html: `<p>    При переході по цьому посиланню ви підтверджуєте реєстрацію ім'я:${newData.name} прізвище:${newData.surname} email:${userEmail} в Almazur.</p>
    <a href="${BASE_URL}/auth/checking/${checkingToken}" target="_blank"> Confirm Email Address</a> 
    <p>З повагою, Almazur group</p>
    `,
  };

  return mail;
};

module.exports = createCheckingEmail;
