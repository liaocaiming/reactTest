const express = require('express')
const app = express();
const router = express.Router()
// app.use((req:any, res:any) => {
//     console.log(req.path, 'req')
//     res.end('./index.html')
//     // console.log(req, 'req')
// })
app.use(express.static(`${process.cwd()}/dist`))
app.use(express.static(`${process.cwd()}/node_modules`))
// router.use((req:any, res:any, next:any) => {
//     const path = req.originalUrl;
//     // console.log(req)
//     // console.log(path, 1)
//     const exa = path.split('.');
//     if (path === '/' || (exa[1] && exa[1] === 'html')) {
//         const url = `${process.cwd()}/dist/index.html`
//         console.log(url, '1')
//         app.use(express.static(`${process.cwd()}/dist`))
//         res.sendFile(url)
//         // res.write(url)
//         next()
//     } else if (exa[0].indexOf('node_modules') !== -1) {
//         console.log(path, '2')
//         app.use('/node_modules', express.static(`${process.cwd()}/node_modules`))
//         res.sendFile(`${process.cwd()}/${path}`)
//         next()
//     } else {
//         console.log(path, '3')
//         next()
//     }
// })
// app.use('*', router)
app.listen(3000)

console.log('listen to 3000')