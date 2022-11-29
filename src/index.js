import { preprocess } from './preprocess.js';
import { postprocess } from './postprocess.js';

export default { processors: { hamber3: { preprocess, postprocess, supportsAutofix: true } } };
