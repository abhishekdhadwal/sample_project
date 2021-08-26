
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
const scope = app_constansts.scope;


const login = async(payloadData : any) => {
      try {

            let query = { email : payloadData.email }
            let projection = { __v : 0 }
            let options = { lean : true }
            let fetch_data : any = await DAO.get_data(Models.Admin, query, projection, options)
            
            if(fetch_data.length) {

                  let password = fetch_data[0].password
                  let decrypt = await common_controller.decrypt_password(payloadData.password, password)

                  if(decrypt != true) { throw error_msg.invalid_password }
                  else {

                        // generate token 
                        let response = await common_controller.gen_admin_token(fetch_data)
                        return response

                  }

            }else {
                  throw error_msg.no_data_found;
            }

      }
      catch(err) {
            throw err;
      }
}


export  { 
      login
}