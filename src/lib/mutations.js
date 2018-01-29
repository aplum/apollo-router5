import gql from 'graphql-tag';

export const navigateTo = gql`
    mutation __ROUTER_NAVIGATE_TO($name: String!, $params: Router5_Params, $opts: Router5_Opts) {
        __ROUTER_NAVIGATE_TO(name: $name, params: $params, opts: $opts) @client
    }
`;

export const cancelTransition = gql`
    mutation __ROUTER_CANCEL_TRANSITION {
        __ROUTER_CANCEL_TRANSITION @client
    }
`;

export const clearErrors = gql`
    mutation __ROUTER_CLEAR_ERRORS {
        __ROUTER_CLEAR_ERRORS @client
    }
`;

export const transitionStart = gql`
    mutation __ROUTER_TRANSITION_START($route: Router5_Route, $previousRoute: Router5_Route) {
        __ROUTER_TRANSITION_START(route: $route, previousRoute: $previousRoute) @client
    }
`;

export const transitionSuccess = gql`
    mutation __ROUTER_TRANSITION_SUCCESS($route: Router5_Route, $previousRoute: Router5_Route) {
        __ROUTER_TRANSITION_SUCCESS(route: $route, previousRoute: $previousRoute) @client
    }
`;

export const transitionError = gql`
    mutation __ROUTER_TRANSITION_ERROR($route: Router5_Route, $previousRoute: Router5_Route, $transitionError: Router5_Error) {
        __ROUTER_TRANSITION_ERROR(route: $route, previousRoute: $previousRoute, transitionError: $transitionError) @client
    }
`;

export const canActivate = gql`
    mutation __ROUTER_CAN_ACTIVATE($name: String!, $canActivate: Boolean!) {
        __ROUTER_CAN_ACTIVATE(name: $name, canActivate: $canActivate) @client
    }
`;

export const canDeactivate = gql`
    mutation __ROUTER_CAN_DEACTIVATE($name: String!, $canDeactivate: Boolean!) {
        __ROUTER_CAN_DEACTIVATE(name: $name, canDeactivate: $canDeactivate) @client
    }
`;
