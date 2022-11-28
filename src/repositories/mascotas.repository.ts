import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascotas, MascotasRelations, Usuarios, Planes} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {PlanesRepository} from './planes.repository';

export class MascotasRepository extends DefaultCrudRepository<
  Mascotas,
  typeof Mascotas.prototype.id,
  MascotasRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Mascotas.prototype.id>;

  public readonly planes: HasManyRepositoryFactory<Planes, typeof Mascotas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(Mascotas, dataSource);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
