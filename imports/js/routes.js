// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'
import { routeLink } from './routeLink';

// Create router instance
const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

RouterFactory.configure(router => {
    router.addRoutes(routeLink);
});

export default routerFactory;