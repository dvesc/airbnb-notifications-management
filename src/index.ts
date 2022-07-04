/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import * as dotenv from 'dotenv';
import { SQS_register_process_consumer } from './aws/sqs/register_process_queue';
import { SQS_complete_users_registration_consumer } from './aws/sqs/complete_user_registration_queue';
import { SQS_password_process_queue } from './aws/sqs/password_process_queue';
import { SQS_complete_password_change_queue } from './aws/sqs/complete_password_change_queue';

const init_app = () => {
  dotenv.config();
  const app = express();

  SQS_password_process_queue();
  SQS_complete_users_registration_consumer();
  SQS_register_process_consumer();
  SQS_complete_password_change_queue();

  app.listen(process.env.PORT, () => console.log('Running in port 7000'));
};

init_app();
