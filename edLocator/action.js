function action(mostFit){
  console.log('Most Fit:',mostFit);
  if (mostFit != false){
    $('#addressInput').blur();
    $('#actionBar').fadeIn();
    $('#largeD').html(mostFit[4]);
    $('#smallD').html(mostFit[5]);
    $('#legislator').empty();
    $('#legislator').hide();
    showLegislator(candidate[mostFit[4]+'-'+mostFit[5]],mostFit[4],mostFit[5]);
  }
  else {$('#actionBar').fadeOut();$('#addressInput').val('');$('#addressInput').attr('placeholder','沒有結果，請嘗試輸入完整地址。');$('#addressInput').focus()}
}

function showLegislator(data,largeD,smallD){
  $('#legislator').fadeIn();
  for (var x=0;x<data.length;x++){
    $('#legislator').append('<button onclick="showExternalInfo(this)" data-name="{name}" data-party="{party}" data-largeD={largeD} data-smallD={smallD} type="button" class="btn btn-default legislator"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> {name} ({party})</button>'.replace(/{name}/g,data[x][0]).replace(/{party}/g,data[x][1]).replace('{largeD}',largeD).replace('{smallD}',smallD))
  }
}

function showExternalInfo(button){
  $('#externalInfo').hide();
  //Panel Title
  $('#externalInfo > .panel-heading .panel-title > b').html($(button).attr('data-name')+' ('+$(button).attr('data-party')+')')
  //Google
  $('#externalInfo_google').attr('onclick',"window.open('http://www.google.com.tw/search?q=%22{name}%22+%22立委%22+%22{party}%22', 'externalInfo')".replace('{name}',$(button).attr('data-name')).replace('{party}',$(button).attr('data-party')))
  //Votely
  $('#externalInfo_votely').attr('onclick',"window.open('http://vote.ly.g0v.tw/candidates/9/{largeD}/{smallD}/', 'externalInfo')".replace('{largeD}',$(button).attr('data-largeD')).replace('{smallD}',$(button).attr('data-smallD')))
  //Watchout
  var watchoutlegislatorID = watchoutLegislator[$(button).attr('data-name')];
  if (watchoutlegislatorID!= undefined){
    $('#externalInfo_watchout').show()
    $('#externalInfo_watchout').attr('onclick',"window.open('http://wevote.tw/people/{ID}/records/', 'externalInfo')".replace('{ID}',watchoutlegislatorID))
  }
  else{
    $('#externalInfo_watchout').hide()
  }
  $('#externalInfo').slideDown();
}
