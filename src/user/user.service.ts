import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, InstanceType } from 'typegoose';

import { BaseService } from 'src/shared/base.service';
import { MapperService } from 'src/shared/mapper/mapper.service';
import { User } from './models/user.model';
import { RegisterVm } from './models/register-vm.model';
import { compare, getSalt, hash } from 'bcryptjs';
import { LoginVm } from './models/login-vm.model';
import { LoginResponseVm } from './models/login-response-vm.model';
import { JwtPayload } from 'src/shared/auth/jwt.payload';
import { AuthService } from 'src/shared/auth/auth.service';
import { UserVm } from './models/user-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectModel(User.modelName)
    private readonly _userModel: ModelType<InstanceType<User>>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService)) readonly _authService: AuthService) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    async register(register: RegisterVm): Promise<User> {
        const { username, password, firstName, lastName } = register;

        const newUser = new this._model();
        newUser.username = username;
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = 10;
        newUser.password = await hash(password, salt);



        try {
            const result = await this.create(newUser);

            return result.toJSON() as User;
        } catch (e) {
            //MongoError
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(login: LoginVm): Promise<LoginResponseVm> {
        const { username, password } = login;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid creadentials', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid creadentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);
        const userVm: UserVm = await this.map<UserVm>(user.toJSON());

        return {
            token,
            user: userVm
        }

    }
}
