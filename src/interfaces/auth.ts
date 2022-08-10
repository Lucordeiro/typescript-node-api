import { Request } from 'express';
import User from './user';

export default interface Auth extends Request {
    user?: User;
}