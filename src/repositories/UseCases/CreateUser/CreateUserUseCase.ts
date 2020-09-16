import { User } from "../../../entites/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { IUsersRepository } from "../../IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

// Apenas criar Usuário!
export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}
    
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error('User already exists.');
        }
        
        const user = new User(data);
        
        await this.usersRepository.save(user);

        // envio de email
       await this.mailProvider.sendMail({
           to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do Meu Aplicativo',
                email: 'equipe@app.com',
            },
            subject: 'Seja bem-vindo á platafomra',
            body: '<p> Você já pode fazer login em nossa plataforma.<p/>'
        })
    }
}