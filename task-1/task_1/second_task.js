import fs from 'fs';
import csvToJson from 'csvtojson';
import Util from 'util';

//maxRowLength:1 writes one line at a time!
const rs = csvToJson({maxRowLength: 1, output: 'json', headers: ['book', 'author', 'amount', 'price']}).fromFile('./nodejs-hw1-ex1.csv');

const rsPromise = csvToJson({ output: 'json', headers: ['book', 'author', 'amount', 'price']}).fromFile('./nodejs-hw1-ex1.csv');
const ws = fs.createWriteStream('./node_text.txt');
const writeFile = Util.promisify(fs.writeFile);

//read and write file by chunks
rs.pipe(ws).on('error',err=>{
    return console.error(err.message);
}); 


//read fully saved in RAM and write
rsPromise.then(json => {
    writeFile('./node_full_write.txt', JSON.stringify(json));
})