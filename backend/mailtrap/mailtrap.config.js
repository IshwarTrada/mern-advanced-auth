import { MailtrapClient } from "mailtrap";

const TOKEN = "ba4909a0ee8e1c3aae8d03be778ff3e3";

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Ishwar Trada",
};

export { mailtrapClient, sender };

// const recipients = [
//   {
//     email: "ishwartrada15@gmail.com",
//   }
// ];

// mailtrapClient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
