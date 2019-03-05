import apolloPlugin from './lib/apolloPlugin';
import * as mutations from './lib/mutations';
import { routerResolvers, routerDefaults, injectRouterToApollo } from './lib/mutationResolvers';

export {
    apolloPlugin,
    mutations,
    routerResolvers,
    routerDefaults,
    injectRouterToApollo,
};
