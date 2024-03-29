function openTeam(i) {
  window.location= '/team?' + i;
}

function persianTest(str) {
  var arabic = /[\u0600-\u06FF]/;
  var result = arabic.test(str);
  if (result == true) return true;
  else return false;
}

function getTeams(){
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data[0]) {
      $(".teams-list-li").remove();
      for (let i = 0; i < data.length; i++) {
        var teamName = data[i].name;
        var teamPictureId = data[i].picture;
        var teamId = data[i].id;
        var teamPicture = "/api/photos?teamPic="+teamPictureId;
        if (persianTest(teamName) == true) languageSettings = "style='font-family: yekan'";
        else languageSettings = '';
        var element = `
        <li id="team-${teamId}" class="teams-list-li" onClick="openTeam(${teamId})">
        <img src="${teamPicture}">
        <span ${languageSettings} class="teams-list-name">${teamName}</span>
        </li>
        `
        $("#teams-list-ul").append(element);
      }
      $("#teams-list").fadeIn('fast');
    } else {
      $("#teams-list").fadeOut('fast');
      $("#team-notfound").css('display', 'block');
    }
  });
}


$(document).ready( () => {
  getTeams();
});
