
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Keys} from '../config/keys';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';

const passgen = require('password-generator');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuariosRepository)
    public usuarioRepository : UsuariosRepository
  ) {}

  passGenerate() {
    let clave = passgen(8, false)
    return clave
  }

  passEncrypt(clave: string) {
    let claveCifrada = crypto.MD5(clave).toString()
    return claveCifrada
  }

  getUser(user: string, pass: string) {

    try {
      let currentUser = this.usuarioRepository.findOne({where: {correo: user, contrasena: pass}})
      if (currentUser) {
        return currentUser
      }
      return false
    } catch (error) {
      return false
    }

  }

  getToken(usuario: Usuarios) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol,
      }
    },
      Keys.jwtKey)
      return token;
  }

  validToken(token: string) {

    try {
    let datos = jwt.verify(token, Keys.jwtKey)
    return datos
    } catch (error) {
      return false
    }
  }

}
