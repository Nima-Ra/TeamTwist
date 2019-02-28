function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

function openTeam(i) {
  window.location= '/team?' + i;
}

function getTeams(){
  $.post('/api/getTeams', {user_token: token}, (data) => {
    if (data.length == 0) {
      $("#team-notfound").css('display', 'block');
    } else {
      for (let i = 0; i < data.length; i++) {
        var element = `
        <li class="teams-list-li" onClick="openTeam(${i})">
        <img src="/api/photos?teamPic=${data[i].picture}">
        <span class="teams-list-name">${data[i].name}</span>
        </li>`
        $("#teams-list-ul").append(element);
      }
      $("#teams-list").css('display', 'block');
    }
  });
}

var token = getCookie('token');

$(document).ready( () => {
  getTeams();
});
