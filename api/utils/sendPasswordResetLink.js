const { createMailTransporter } = require("./createMailTransporter");
const sendPasswordResetLink = async (email, link) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: "admin@dzhikers.live",
    to: email,
    subject: "Lien de rĂ©initialisation de mot de passe",
    html: `<p>Clickez sur ce lien pour rĂ©initialiser votre mot de passe: </p>
    <a href="${link}">RĂ©initialiser votre mot de passe</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendPasswordResetLink };
