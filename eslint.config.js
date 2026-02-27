import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import unicorn from "eslint-plugin-unicorn"

export default tseslint.config(
	eslint.configs.recommended,
	sonarjs.configs.recommended,
	unicorn.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				__APP_VERSION__: true
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
			],
			'sonarjs/cognitive-complexity': ['off'],
			'sonarjs/no-nested-conditional': ['off'],
			'sonarjs/pseudo-random': ['off'],
			'sonarjs/void-use': ['off'],
			'sonarjs/todo-tag': ['off'],
			'unicorn/prevent-abbreviations': ['off'],
			'unicorn/filename-case': ['off'],
			// Three.js/WebAudio APIs require null (disconnect(null), DOM APIs)
			'unicorn/no-null': ['off'],
			// reduce is readable for accumulation patterns
			'unicorn/no-array-reduce': ['off'],
			// test helpers intentionally scoped inside describe blocks
			'unicorn/consistent-function-scoping': ['off'],
			// passing named fn to .map() is fine
			'unicorn/no-array-callback-reference': ['off'],
			// object default params are fine
			'unicorn/no-object-as-default-parameter': ['off'],
			// export * is valid syntax
			'unicorn/require-module-specifiers': ['off']
		}
	},
	{
		ignores: [
			'scripts/',
			'build/',
			'.svelte-kit/',
			'dist/',
			'docs/',
			'.build-check/',
			'rnbo/',
			'.heap-snapshots/',
			'.fonts/'
		]
	}
)
