import apolloPluginFactory from './lib/apolloPlugin';
import * as mutations from './lib/mutations';
import { routerResolvers, routerDefaults, injectRouterToApollo } from './lib/mutationResolvers';

export {
    apolloPluginFactory,
    mutations,
    routerResolvers,
    routerDefaults,
    injectRouterToApollo,
};
