var data= Object.values(window.__data.legislators);
var legislator = {};
for (var x=0;x<data.length;x++){
 legislator[data[x].name] = data[x].id;
}
console.log(JSON.stringify(legislator));
