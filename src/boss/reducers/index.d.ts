export  interface IBossActions {
  getSymbol:(opions?: { url?: string}) => Promise<any>
}