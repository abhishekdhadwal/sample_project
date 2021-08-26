
import { createSchema, Type, typedModel } from 'ts-mongoose';

const AdminSchema = createSchema({

      access_token : Type.string({ default : null }), 
      email : Type.string({ default : null }), 
      password : Type.string({ default : null }), 
      token_gen_at : Type.number({ default : 0 }), 
      created_at : Type.number({ default : +new Date() })

})

const Admin = typedModel('admins', AdminSchema);

export default Admin