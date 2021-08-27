
import * as DAO from './src/DAO/index';
import * as Models from './src/Models/index';
import { common_controller } from './src/Controller/index'

const bootstrap_data = async() => {
      try {

            await create_default_admins()
            await create_dummy_user()

      }
      catch(err) {
            throw err;
      }
}


const create_default_admins = async() => {
      try {

            let query = { email :"admin@gmail.com" }
            let projection = { __v : 0 }
            let options = { lean : true }
            let fetch_data : any = await DAO.get_data(Models.Admin, query, projection, options);
            
            if(fetch_data.length == 0) {
    
                let default_password = 'qwerty';
                let password = await common_controller.bcrypt_password(default_password)

                let save_data = {
                  email : "admin@gmail.com",
                  password : password,
                  created_at : +new Date()
                }
    
                await DAO.save_data(Models.Admin, save_data);
    
            }

      }
      catch(err) {
            throw err;
      }
}


const create_dummy_user = async() => {
      try {

        // check user exist or not
        let query = { email :"user@gmail.com" }
        let projection = { __v : 0 }
        let options = { lean : true }
        let fetch_data : any = await DAO.get_data(Models.Users, query, projection, options);
        
        if(fetch_data.length == 0) {

            let default_password = 'qwerty';
            let password = await common_controller.bcrypt_password(default_password)

            // create user
            let save_data = {
                  name : "dummy_user",
                  email : "user@gmail.com",
                  password : password,
                  created_at : +new Date()
            }

            let options = { multi : true }
            await DAO.save_data(Models.Users, save_data);

        }

      }
      catch(err) {
            throw err;
      }
}



export default bootstrap_data;