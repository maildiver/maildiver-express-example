import express, { Request, Response } from 'express';
import { maildiver } from './maildiver';

const app = express();

app.post('/send-email', async (req: Request, res: Response) => {
  try {
    const maildiverRes = await maildiver.email.send({
      to: 'sudo@example.com',
      from: 'you@example.com',
      subject: 'Email from the Maildiver Node.js SDK',
      html: '<p>Hi {{ firstName }}! Maildiver Node.js SDK is awesome!</p>',
      variables: {
        values: {
          firstName: 'Developer Name',
        },
        default_values: {
          fistName: 'there',
        },
      },
    });

    res.status(200).send(maildiverRes);
  } catch (err) {
    res.status(400).send(err);
  }
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
