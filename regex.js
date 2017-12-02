
const re = /img:\S*\s/g;
const test = "this img:http://s4.thingpic.com/images/iH/W8sqdmcuyxHWLfo46UGomsU3.jpeg is a text ";
const result =test.match(re);
const words  = test.split(re);
let str = "";
for(let i = 0;i<result.length;i++){
  str +=words[i]+result[i].slice(4);
}
str+=words[words.length-1];
console.log(str);

