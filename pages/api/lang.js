import fs from 'fs';
export default function addTextLagng(req, res) {
    let { body } = req
    let langs = fs.readFileSync('./lib/lang.json', body)
    langs = JSON.parse(langs)
    langs.en[body?.key] = body.en
    langs.ar[body?.key] = body.ar
    fs.writeFileSync('./lib/lang.json', JSON.stringify(langs))
    req.statusCode = 200


}