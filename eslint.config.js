import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	eslint.configs.recommended,
	sonarjs.configs.recommended,
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
			'sonarjs/todo-tag': ['off']
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
