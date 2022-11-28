import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Planes} from './planes.model';
import {Usuarios} from './usuarios.model';

@model()
export class Mascotas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => Planes)
  planes: Planes[];

  constructor(data?: Partial<Mascotas>) {
    super(data);
  }
}

export interface MascotasRelations {
  // describe navigational properties here
}

export type MascotasWithRelations = Mascotas & MascotasRelations;
