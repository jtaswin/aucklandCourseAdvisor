import { JsonController, Body, Post, NotFoundError } from 'routing-controllers';
import { User } from '../model/models';
import Container from 'typedi';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '../services/jwt.service';

@JsonController('/accounts')
export class AccountsController {

  private service = Container.get(UserRepository);
  private jwt = Container.get(JwtService);
  @Post('/login')
  async login(@Body() model: User) {
    try {
      const user = await this.service.findOneOrFail({ where: { email: model.email, password: model.password } });

      user.password = '';

      const token = this.jwt.createToken(user as User);

      return { user, token };

    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }

  @Post('/create')
  async create(@Body() user: User) {
    return await this.service.add(user);
  }

}
