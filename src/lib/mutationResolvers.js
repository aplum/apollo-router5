import gql from 'graphql-tag';

export const routerDefaults = {
    router: {
        __typename: 'Router5_Properties',
        route: null,
        previousRoute: null,
        transitionRoute: null,
        transitionError: null,
    },
};


const query = gql`
    query __ROUTER_GET_STATE {
        router @client {
            route {
                ...routeFields
            }
            previousRoute {
                ...routeFields
            }
            transitionRoute {
                ...routeFields
            }
            transitionError {
                code
                segment
                error
            }
        }
    }
    fragment routeFields on Router5_Route {
        name
        path
        params
        meta {
            id
            params
        }
    }
`;


function writeNewState(cache, newState) {
    let ns = {};
    let fields = ['route', 'previousRoute', 'transitionRoute', 'transitionError'];
    for (let field of fields) {
        if (newState.hasOwnProperty(field)) {
            if (newState[field] === null) ns[field] = null;
            else {
                if (field === 'transitionError') {
                    ns[field] = {
                        __typename: 'Router5_Error',
                        code: newState[field].code,
                        segment: newState[field].segment || null,
                        error: newState[field].error || null,
                    };
                }
                else { 
                    ns[field] = {
                        __typename: 'Router5_Route',
                        name: newState[field].name,
                        path: newState[field].path,
                        params: JSON.stringify(newState[field].params),
                        meta: {
                            __typename: 'Router5_Route_Meta',
                            id: newState[field].meta.id,
                            params: JSON.stringify(newState[field].meta.params),
                        },
                    };
                }
            }
        }
    }
    
    const previousState = cache.readQuery({ query });
    const data = {
        router: {
            ...previousState.router,
            ...ns,
        },
    };
    cache.writeData({ data });
}


let deps = {};
export function injectRouterToApollo(router) {
    deps.router = router;
}


export const routerResolvers = {
    __ROUTER_NAVIGATE_TO: (_, args) => {
        deps.router.navigate(
            args.name,
            args.params,
            args.opts
        );
        return null;
    },
    
    __ROUTER_CANCEL_TRANSITION: () => {
        deps.router.cancel();
        return null;
    },
    
    __ROUTER_CAN_ACTIVATE: (_, args) => {
        deps.router.canActivate(
            args.name,
            args.canActivate
        );
        return null;
    },
    
    __ROUTER_CAN_DEACTIVATE: (_, args) => {
        deps.router.canDeactivate(
            args.name,
            args.canDeactivate
        );
        return null;
    },
    
    __ROUTER_TRANSITION_START: (_, args, { cache }) => {
        writeNewState(cache, {
            transitionRoute: args.route,
            transitionError: null,
        });
        return null;
    },
    
    __ROUTER_TRANSITION_SUCCESS: (_, args, { cache }) => {
        writeNewState(cache, {
            transitionRoute: null,
            transitionError: null,
            previousRoute: args.previousRoute,
            route: args.route,
        });
        return null;
    },
    
    __ROUTER_TRANSITION_ERROR: (_, args, { cache }) => {
        writeNewState(cache, {
            transitionRoute: args.route,
            transitionError: args.transitionError,
        });
        return null;
    },
    
    __ROUTER_CLEAR_ERRORS: (_, args, { cache }) => {
        writeNewState(cache, {
            transitionRoute: null,
            transitionError: null,
        });
        return null;
    },
};
