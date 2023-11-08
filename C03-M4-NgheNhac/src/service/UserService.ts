import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/jwt";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    register = async (user: User) => {
        let userObj = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        });
        if (userObj && user.username === userObj.username) {
            return `Account '${user.username}' already exists`;
        } else {
            return this.userRepository.save(user);
        }
    }

    checkUser = async (user) => {
        let userFind = await this.userRepository.findOneBy({ username: user.username });
        if (!userFind) {
            return { error: 'User is not exist' };
        } else {
            let passWordCompare =  bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: 'admin'
                };
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100,
                });
                return { token, username: userFind.username, id: userFind.id };
            } else {
                return { error: 'Password is wrong' };
            }
        }
    };


    findAll = async () => {
        return this.userRepository.find()
    }
    findById = async (id) => {
        return this.userRepository.find({
            where: {
                id: id
            }
        })
    }
    findByName = async (name) => {
        return this.userRepository.find({
            where: {
                username: Like(`%${name}%`)
            }
        });
    }
}

export default new UserService();
