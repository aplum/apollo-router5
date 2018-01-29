import * as mutations from './mutations';

function apolloPluginFactory(mutate) {
    function apolloPlugin() {
        return {
            onTransitionStart(toState, fromState) {
                mutate({
                    mutation: mutations.transitionStart,
                    variables: {
                        route: toState,
                        previousRoute: fromState,
                    },
                });
            },
            onTransitionSuccess(toState, fromState) {
                mutate({
                    mutation: mutations.transitionSuccess,
                    variables: {
                        route: toState,
                        previousRoute: fromState,
                    },
                });
            },
            onTransitionError(toState, fromState, err) {
                mutate({
                    mutation: mutations.transitionError,
                    variables: {
                        route: toState,
                        previousRoute: fromState,
                        transitionError: err,
                    },
                });
            },
        };
    }
    
    apolloPlugin.pluginName = 'APOLLO_PLUGIN';
    
    return apolloPlugin;
}

export default apolloPluginFactory;
