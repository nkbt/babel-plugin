import {transformFileSync as tr} from 'babel-core';
import * as t from 'babel-types';


const result = tr(`${__dirname}/lib.js`, {
  plugins: [
    () => ({
      visitor: {
        Program(path) {
          const {node} = path;

          console.log('index.js:15    node', node.directives);

          for (let directive of (node.directives)) {
            if (directive.value.value === "use strict") {
              return;
            }
          }

          path.unshiftContainer("directives", t.directive(t.directiveLiteral("use strict")));
        }
      }
    })
  ]
});


console.log(result.code);
