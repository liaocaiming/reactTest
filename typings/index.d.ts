/// <reference types="../node_modules/@types/react" />
/// <reference types="../node_modules/@types/react-redux" />
/// <reference types="../node_modules/@types/react-router-dom" />
/// <reference types="../node_modules/@types/react-router" />
/// <reference types="../node_modules/@types/lodash.assign" />
/// <reference types="../node_modules/@types/node" />

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare module '*.css' {
  var style: any;
  export = style;
}


declare module '*.css';

