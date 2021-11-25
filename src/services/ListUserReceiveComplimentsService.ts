import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"

class ListUserReceiveComplimentsService {
    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        console.log("Procurar receive compliments do ID ", user_id);

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            }
        })

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }