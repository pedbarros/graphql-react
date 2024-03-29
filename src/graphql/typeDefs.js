import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const typeArray = fileLoader(path.join(__dirname, 'modules', '**', '*.gql'));
const typesDefs = mergeTypes(typeArray);

export default typesDefs;