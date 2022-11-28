import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascotas,
  Usuarios,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasUsuariosController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Usuarios> {
    return this.mascotasRepository.usuarios(id);
  }
}
