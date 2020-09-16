import { Router } from "express";
import { createUserController } from "./repositories/UseCases/CreateUser";

const router = Router();

router.post('users/',(request, response) => {
    return createUserController.handle(request,response)
})

export { router } ;