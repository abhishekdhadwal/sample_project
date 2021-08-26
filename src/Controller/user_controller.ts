
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
const scope = app_constansts.scope;



const signup = async(payload_data : any) => {
   try {

      // check user email
      let email = payload_data.email.toLowerCase()
      let fetch_data : any = await common_controller.check_user_email(email)

      if (fetch_data.length) { throw error_msg.email_already_exists }
      else {

         let set_data = {
            email : email,
            name :  payload_data.name,
            password :  payload_data.password,
            created_at :  +new Date()
         }

         let create_new_user = await DAO.save_data(Models.Users, set_data)

         // generate new token
         let response = await common_controller.gen_user_token(create_new_user)

         return response

      }

   }
   catch(err) {
      throw err;
   }
}



const login = async(payload_data : any) => {
   try {

      let query = { email : payload_data.email.toLowerCase() }
      let projection = { __v : 0 }
      let options = { lean : true }
      let fetch_data : any = await DAO.get_data(Models.Users, query, projection, options)

      if(fetch_data.length) {

         if(payload_data.password != fetch_data[0].password) {
            throw error_msg.invalid_password
         }
         else {

            // generate new token
            let response = await common_controller.gen_user_token(fetch_data[0])
            return response

         }

      }

   }
   catch(err) {
      throw err;
   }
}





export {
   signup,
   login
}