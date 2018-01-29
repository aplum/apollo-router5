import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

const name = 'apolloRouter5';

const plugins = [
    babel(),
    nodeResolve({
        module: true,
        jsnext: true,
    }),
    commonjs({
        include: 'node_modules/**',
    }),
];

const isProd = process.env.NODE_ENV === 'production';
if (isProd) plugins.push(uglify());

export default {
    input: 'src/index.js',
    plugins,
    output: {
        file: `dist/umd/${name}${isProd ? '.min' : ''}.js`,
        format: 'umd',
        name,
    },
};
