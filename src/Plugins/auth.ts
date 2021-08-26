
import { verify_token } from '../Libs/index';
import { app_constansts } from '../Config/index';
const sk = app_constansts.seckret_keys;
const scope = app_constansts.scope;


const admin = {
      key : sk.admin_seckret_key,
      validate : verify_token,
      verifyOptions : { algorithms: [ 'HS256' ], ignoreExpiration : false }
}


const user = {
      key : sk.user_seckret_key,
      validate : verify_token,
      verifyOptions : { algorithms: [ 'HS256' ], ignoreExpiration : false }
}

exports.plugin = {
      name: 'auth',
      register: async (server, options) => {
               await server.register(require('hapi-auth-jwt2'));
               server.auth.strategy(scope.admin, 'jwt', admin);
               server.auth.strategy(scope.user, 'jwt', user);
               server.auth.default(scope.admin);
      }
}
