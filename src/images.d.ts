declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.json'

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}