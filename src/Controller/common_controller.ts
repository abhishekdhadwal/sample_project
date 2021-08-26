
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { generate_token } from '../Libs/index';
import bcrypt from 'bcrypt';

const scope = app_constansts.scope;
const salt_rounds = app_constansts.salt_rounds


const fetch_token = async(function_data : any) => {
      try {

            let fetch_token = await generate_token(function_data)

            // save token in database
            let query = { _id : function_data._id }
            let update_data = { 
                  access_token : <string>fetch_token, 
                  token_gen_at : function_data.token_gen_at 
            }
            let options = { new : true }
            let token_info = await DAO.find_and_update(function_data.collection, query, update_data, options)
            return token_info

      }
      catch(err) {
            throw err;
      }
}

const gen_admin_token = async(data : any) => {
      try {

            let token_data = { 
                  _id : data[0]._id,
                  scope : scope.admin,
                  collection : Models.Admin,
                  token_gen_at : +new Date()
            }

            let response = await fetch_token(token_data)

            return response

      }
      catch(err) {
            throw err;
      }
}

const gen_user_token = async(data : any) => {
      try {

            let token_data = { 
                  _id : data._id,
                  scope : scope.user,
                  collection : Models.Users,
                  token_gen_at : +new Date()
            }

            let response = await fetch_token(token_data)

            return response

      }
      catch(err) {
            throw err;
      }
}


const check_user_email = async(email : string) => {
      try {

            let query = { email : email }
            let projection = { __v : 0 }
            let options = { lean : true }
            let response = await DAO.get_data(Models.Users, query, projection, options)
            return response

      }
      catch(err) {
            throw err;
      }
}

const bcrypt_password = async(password : string) => {
      try {

            const hash = await bcrypt.hashSync(password, salt_rounds);
            return hash

      }
      catch(err) {
            throw err;
      }
}

const decrypt_password = async(password : string, hash : string) => {
      try {

            const decryt = await bcrypt.compareSync(password, hash); 
            return decryt

      }
      catch(err) {
            throw err;
      }
}

export {
      fetch_token,
      gen_admin_token,
      gen_user_token,
      check_user_email,
      bcrypt_password,
      decrypt_password
}