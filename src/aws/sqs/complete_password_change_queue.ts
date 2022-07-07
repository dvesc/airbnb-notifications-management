/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer'; // intalar en npm; es para consumir msg de sqs con listeners
import dotenv from 'dotenv';
import { send_email } from '../../utils/nodemailer';

dotenv.config();

const params = new AWS.SQS({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// CONSUMIR MSG-----------------------------------------------------------
// esta funcion debemos llamarla en index la app para que cunaod inicie la app tambien lo haga el consumer
export const SQS_complete_password_change_queue = (): void => {
  const consumer = Consumer.create({
    queueUrl: process.env.SQS_COMPLETE_PASSWORD_CHANGE_URL,
    handleMessage: async (msg: AWS.SQS.Message) => {
      // estara pendiente de cuando llegue un msg
      // lo que se hara cuando llegue el mensaje

      // convertimos el json a un obj
      const string_msg: string = msg.Body!,
        obj_msg: any = JSON.parse(string_msg);

      // enviamos el email
      console.log(
        `[S3QUEUE:complete-password-change] Sending email to ${obj_msg.email}`
      );
      send_email(obj_msg.email, obj_msg.html, obj_msg.subject);
    },
    sqs: params,
  });

  // el on establese listener de errores
  consumer.on('error', err => {
    console.error(err.message);
  });
  consumer.on('processing_error', err => {
    console.error(err.message);
  });

  console.log('SQS Consumer is active');
  consumer.start(); // pone activo al consumidor
};
