import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascotas,
  Planes,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasPlanesController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/planes', {
    responses: {
      '200': {
        description: 'Array of Mascotas has many Planes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Planes>,
  ): Promise<Planes[]> {
    return this.mascotasRepository.planes(id).find(filter);
  }

  @post('/mascotas/{id}/planes', {
    responses: {
      '200': {
        description: 'Mascotas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanesInMascotas',
            exclude: ['id'],
            optional: ['mascotasId']
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.mascotasRepository.planes(id).create(planes);
  }

  @patch('/mascotas/{id}/planes', {
    responses: {
      '200': {
        description: 'Mascotas.Planes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Partial<Planes>,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.mascotasRepository.planes(id).patch(planes, where);
  }

  @del('/mascotas/{id}/planes', {
    responses: {
      '200': {
        description: 'Mascotas.Planes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.mascotasRepository.planes(id).delete(where);
  }
}
