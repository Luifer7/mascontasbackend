import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Planes, PlanesRelations, Mascotas} from '../models';
import {MascotasRepository} from './mascotas.repository';

export class PlanesRepository extends DefaultCrudRepository<
  Planes,
  typeof Planes.prototype.id,
  PlanesRelations
> {

  public readonly mascotas: BelongsToAccessor<Mascotas, typeof Planes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>,
  ) {
    super(Planes, dataSource);
    this.mascotas = this.createBelongsToAccessorFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
