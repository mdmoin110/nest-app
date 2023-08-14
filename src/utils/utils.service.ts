import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT = bcrypt.genSaltSync();

@Injectable()
export class UtilsService {
    constructor() { }

    async encodePassword(rawPassword: string) {
        return bcrypt.hash(rawPassword, SALT);
    }

    async comparePasswords(rawPassword: string, hash: string) {
        return bcrypt.compareSync(rawPassword, hash);
    }
}
