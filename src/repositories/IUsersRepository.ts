import { User } from "../entites/User";
export interface IUsersRepository{

    //Receber email e retonar usuario caso encontrar
    findByEmail(email: string): Promise<User>;
    //Receber usuario e salvar o usuario sem retornar nada
    save(user: User): Promise<void>;
}