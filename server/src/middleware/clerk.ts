import dotenv from 'dotenv';
import { createClerkClient } from '@clerk/clerk-sdk-node';

dotenv.config();

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export default clerk;