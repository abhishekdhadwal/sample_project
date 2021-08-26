
import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({

      access_token : Type.string({ default : null }),
      name :  Type.string({ default : null }),
      email : Type.string({ default : null }), 
      password : Type.string({ default : null }), 
      token_gen_at : Type.number({ default : 0 }), 
      created_at : Type.number({ default : +new Date() })

})

const Users = typedModel('users', UserSchema);
export default Users