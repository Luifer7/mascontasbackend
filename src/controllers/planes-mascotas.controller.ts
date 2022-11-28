import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Planes,
  Mascotas,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesMascotasController {
  constructor(
    @repository(PlanesRepository)
    public planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Mascotas belonging to Planes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async getMascotas(
    @param.path.string('id') id: typeof Planes.prototype.id,
  ): Promise<Mascotas> {
    return this.planesRepository.mascotas(id);
  }
}
