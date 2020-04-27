var fs = require('fs');

/*fs.writeFile('MyFile.txt','This is From NodeJs app',function(err){
  if(err) throw err;
  console.log('File Created')
})



fs.appendFile('MyFile.txt',Math.floor(Math.random()*(99-1))+1+' This is From NodeJs app \n',function(err){
    if(err) throw err;
    console.log('2>>>> File Created')
  })


fs.readFile('MyFile.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log("3>>>>>>",data)
})

fs.rename('MyFile.txt','MyText.txt',function(err){
    if(err) throw err;
    console.log('4>>>>> Name Changed')
})

fs.unlink('MyText.txt',function(err){
    if(err) throw err;
    console.log('1!!>>> file Deleted')
})

*/

fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})