import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUsersService {
    async execute({ name, email, admin }: IUserRequest) {
        const UsersRepository: Repository<User> = getCustomRepository(UsersRepositories);

        if (!email) throw new Error("Email incorrect")

        const userAlreadyExists = await UsersRepository.findOne({
            email
        })

        if (userAlreadyExists) throw new Error("User already exists!")

        const user = UsersRepository.create({
            name, email, admin
        })

        await UsersRepository.save(user)

        return user;
    }
}

export { CreateUsersService }