
import admin_routes  from './admin_routes';
import user_routes from './user_routes';

const router : any = [ ...admin_routes, ...user_routes ]

export default router