import { Request, Response } from "express"
import { CreateUsersService } from "../services/CreateUsersServices";


class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, admin } = request.body;

        const CreateUserService = new CreateUsersService();

        const user = await CreateUserService.execute({ name, email, admin })

        return response.json(user)
    }
}

export { CreateUserController }