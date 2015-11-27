function action(mostFit){
if (mostFit != false){
  //Set largeD and smallD
  $('#actionBar').fadeIn();
  $('#largeD').html(mostFit[4]);
  $('#smallD').html(mostFit[5]);
  $('#legislator').empty();
  $('#legislator').hide();
  $.getJSON('https://crossorigin.me/http://vote.ly.g0v.tw/api/candidates/' ,{'ad':8,'county':mostFit[4],'constituency':mostFit[5],'format':'json'},function(data){displayLegislator(data)})
}
else {$('#actionBar').fadeOut();}
}

function displayLegislator(data){
  $('#legislator').fadeIn();
  for (var x=0;x<data.results.length;x++){
    var legislatorID = legislator[data.results[x].name];
    if (legislatorID!= undefined){
      $('#legislator').append('<a target="watchout" href="http://wevote.tw/people/'+legislatorID+'/records/" type="button" class="btn btn-default legislator"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+data.results[x].name+'</a>')
    }
    else{
      $('#legislator').append('<a disabled type="button" class="btn btn-default legislator"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+data.results[x].name+'</a>')
    }
  }
}
