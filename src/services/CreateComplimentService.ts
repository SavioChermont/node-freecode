import { getCustomRepository, Repository } from "typeorm"
import { Compliment } from "../entities/Compliment"
import { User } from "../entities/User"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, message, user_receiver, user_sender }: IComplimentRequest) {
        const complimentsRepositories: Repository<Compliment> = getCustomRepository(ComplimentsRepositories);
        const usersRepositories: Repository<User> = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) throw new Error("Incorrect User Receiver")

        const userReceiverExists = await usersRepositories.findOne(user_receiver)

        if (!userReceiverExists) throw new Error("User receiver does not exists!")

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment)

        return compliment

    }
}

export { CreateComplimentService }