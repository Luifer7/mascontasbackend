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
  Usuarios,
  Mascotas,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosMascotasController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascotas>,
  ): Promise<Mascotas[]> {
    return this.usuariosRepository.mascotas(id).find(filter);
  }

  @post('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'id'>,
  ): Promise<Mascotas> {
    return this.usuariosRepository.mascotas(id).create(mascotas);
  }

  @patch('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios.Mascotas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {partial: true}),
        },
      },
    })
    mascotas: Partial<Mascotas>,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.usuariosRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/usuarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Usuarios.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.usuariosRepository.mascotas(id).delete(where);
  }
}
