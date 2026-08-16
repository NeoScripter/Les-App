import preact from 'eslint-config-preact';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';

export default [
    ...preact,
    ...tseslint.configs.recommended,
    {
        plugins: { boundaries },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
            'boundaries/include': ['src/**/*'],
            'boundaries/elements': [
                {
                    mode: 'full',
                    type: 'shared',
                    pattern: [
                        'src/components/**/*',
                        'src/signals/**/*',
                        'src/data/**/*',
                        'src/lib/**/*',
                        'src/hooks/**/*',
                        'src/assets/**/*',
                        'src/services/**/*',
                    ],
                },
                {
                    mode: 'full',
                    type: 'feature',
                    capture: ['featureName'],
                    pattern: ['src/features/*/**/*'],
                },
                {
                    mode: 'full',
                    type: 'app',
                    capture: ['featureName', 'fileName'],
                    pattern: ['src/app/**/*'],
                },
                {
                    mode: 'full',
                    type: 'neverImport',
                    pattern: ['src/*'],
                },
            ],
        },
        rules: {
            'boundaries/no-unknown': ['error'],
            'boundaries/no-unknown-files': ['error'],
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        {
                            from: ['shared'],
                            allow: ['shared'],
                        },
                        {
                            from: ['feature'],
                            allow: [
                                'shared',
                                [
                                    'feature',
                                    { featureName: '${from.featureName}' },
                                ],
                                [
                                    'app',
                                    { featureName: '[${from.featureName}]' },
                                ],
                            ],
                        },
                        {
                            from: ['app', 'neverImport'],
                            allow: ['shared', 'feature', 'app'],
                        },
                    ],
                },
            ],
        },
        ignores: ['dist/', 'node_modules/'],
    },
];
