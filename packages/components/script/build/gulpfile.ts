import { series, parallel } from 'gulp'
import {removeDist, buildStyle, buildComponent, buildFont} from './index'


export default series(
    async () => removeDist(),
    parallel(
        async () => buildStyle(),
        async () => buildComponent(),
        async () => buildFont(),
    )
)

