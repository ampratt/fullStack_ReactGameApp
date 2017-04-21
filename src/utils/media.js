import {css} from 'styled-components'

export const media = {
	// if width is smaller than 800, use handheld
	handheld: (...args) => css`
		@media (max-width: 800px) {
			${ css(...args) }
		}
	`
}
