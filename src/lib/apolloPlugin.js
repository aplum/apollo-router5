import * as mutations from './mutations';

export default function apolloPlugin(_, dependencies) {
    return {
        onTransitionStart(toState, fromState) {
            dependencies.ApolloClient.mutate({
                mutation: mutations.transitionStart,
                variables: {
                    route: toState,
                    previousRoute: fromState,
                },
            });
        },
        onTransitionSuccess(toState, fromState) {
            dependencies.ApolloClient.mutate({
                mutation: mutations.transitionSuccess,
                variables: {
                    route: toState,
                    previousRoute: fromState,
                },
            });
        },
        onTransitionError(toState, fromState, err) {
            dependencies.ApolloClient.mutate({
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
