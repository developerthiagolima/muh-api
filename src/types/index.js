import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
// import { writeFileSync, existsSync } from 'fs'

const path = require('path')
const typesArray = fileLoader(path.join(__dirname, "./*.graphql"));
const typesMerged = mergeTypes(typesArray, { all: false });

// const schemaPath = path.join(__dirname, "../schema.graphql")
// if(!existsSync(schemaPath)){
//     console.log('Arquivo gerado');
//     writeFileSync(schemaPath, typesMerged)
// }

export default typesMerged;