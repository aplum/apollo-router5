[![npm version](https://badge.fury.io/js/apollo-router5.svg)](https://badge.fury.io/js/apollo-router5)

# apollo-router5

> Router5 integration with Apollo Client. Based on [redux-router5](https://github.com/router5/router5/tree/master/packages/redux-router5). Using router5 with apollo may remove the need to include [router5-listeners](https://router5.js.org/advanced/listeners-plugin).

## Requirements

- __[router5](https://github.com/router5/router5) >= 7.0.1__
- __[apollo-client](https://github.com/apollographql/apollo-client) >= 2.5.0__

## How to use

- Create and configure your router instance.
- Create and configure your ApolloClient instance including `routerResolvers` and `routerDefaults`.
- Inject your router instance to `apollo-router5`.
- Add `apolloPlugin` to your router instance.
- Use the provided mutations to perform routing, and/or use your router instance directly.

```javascript
// index.js
import createRouter from 'src/router/create-router';
import { apolloPluginFactory, injectRouterToApollo } from 'apollo-router5';
import client from 'src/apollo/apollo-client';

const router = createRouter();
injectRouterToApollo(router);
router.usePlugin(apolloPluginFactory(client.mutate));
router.start();
```

`injectRouterToApollo` gives the `routerResolvers` from `apollo-router5` access to your router instance so it can translate mutations into router5 method calls (e.g. translates the `navigateTo` mutation to `router.navigate(...)`).

`apolloPluginFactory` creates a router5 plugin that calls mutations to keep your apollo state in sync with your router.

You need to include `routerResolvers` and `routerDefaults` when configuring `apollo-client`:

```javascript
// apollo-client.js
import ApolloClient from 'apollo-boost';
import { routerResolvers, routerDefaults } from 'apollo-router5';
import { yourDefaults, yourResolvers } from './resolvers';

const client = new ApolloClient({
    clientState: {
        defaults: {
            ...routerDefaults,
            ...yourDefaults,
        },
        resolvers: yourResolvers
    }
});

client.addResolvers(routerResolvers);

export default client;
```

_Note: You may need [@babel/plugin-proposal-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread) to use the syntax shown above._

## Apollo Schema

The following schema is used in your local apollo state, starting with `Router5_Properties` under the graphql field `router`:

```graphql
type Router5_Properties {
    route: Router5_Route
    previousRoute: Router5_Route
    transitionRoute: Router5_Route
    transitionError: Router5_Error
}

type Router5_Error {
    code: String!
    segment: String
    error: String
}

type Router5_Route {
    name: String!
    path: String!
    params: String!
    meta: String!
}
```

The `params` and `meta` fields in the schema are JSON strings (from calling `JSON.stringify()` on the data from router5). I wasn't sure how else to make this accessible through graphql given the dynamic nature of the data in these fields. If you have a suggestion for a better approach, please let me know or open an issue!

An example query:

```graphql
{
    router @client {
        route {
            name
            path
        }
    }
}
```

## Mutations

You can use your router instance directly, and/or use these mutations exported from `apollo-router5`:

- navigateTo($name: String!, $params: Router5_Params, $opts: Router5_Opts)
- cancelTransition
- clearErrors
- canActivate($name: String!, $canActivate: Boolean!)
- canDeactivate($name: String!, $canDeactivate: Boolean!)

Router5_Params and Router5_Opts are objects of whatever shape you want. They should not be JSON strings, unlike when querying (as mentioned under [Apollo Schema](#apollo-schema) above).

```javascript
// MyComponent.js
import { mutations } from 'apollo-router5';
import { graphql } from 'react-apollo';

export default graphql(mutations.navigateTo,{
    props: ({ mutate }) => ({
        navigateTo: name => mutate({ variables: { name } }),
    }),
})(MyComponent),

// Inside MyComponent, call this.props.navigateTo('myroute');
```

## Integration with React

To reduce boilerplate and provide the route as a prop to your React components, you could use a HOC such as the following:

```javascript
// withRoute.js
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
    {
        router @client {
            route {
                name
                path
                params
                meta
            }
        }
    }
`;

export default graphql(query, {
    props: (props) => {
        const r = props.data.router.route;
        let route = null;
        if (r) {
            // Create new object to avoid modifying object from Apollo's cache.
            route = {};
            route.name = r.name;
            route.path = r.path;
            route.params = JSON.parse(r.params);
            route.meta = JSON.parse(r.meta);
        }
        return { route };
    },
});
```

Using it on MyComponent:

```javascript
// MyComponent.js
import withRoute from './withRoute';

export default withRoute(MyComponent);
```

## createRouteNodeSelector

I haven't created an equivalent of [createRouteNodeSelector](https://github.com/router5/router5/tree/master/packages/redux-router5#route-node-selector) from `redux-router5` yet. Please open an issue if this would be valuable to you. I haven't built anything with `redux-router5` and I'm still in the early stages of the app I created `apollo-router5` for, so I haven't had need of it yet.
