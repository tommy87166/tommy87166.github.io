function action(mostFit){
if (mostFit != false){
  //Set largeD and smallD
  $('#actionBar').fadeIn();
  $('#largeD').html(mostFit[4]);
  $('#smallD').html(mostFit[5]);
  $('#legislator').empty();
  $('#legislator').hide();
  displayLegislator(candidate[mostFit[4]+'-'+mostFit[5]]);
}
else {$('#actionBar').fadeOut();}
}

function displayLegislator(data){
  $('#legislator').fadeIn();
  for (var x=0;x<data.length;x++){
    var watchoutlegislatorID = watchoutLegislator[data[x][0]];
    if (watchoutlegislatorID!= undefined){
      var href = 'http://wevote.tw/people/'+watchoutlegislatorID+'/records/'
      var color = 'btn-primary'
    }
    else{
      var href ='https://www.google.com.tw/?gws_rd=ssl#q='+data[x][0]
      var color = 'btn-default'
    }
    $('#legislator').append('<a target="info" href="'+href+'"  type="button" class="btn '+color+' legislator"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> '+data[x][0]+' ('+data[x][1]+')</a>')
  }
}
