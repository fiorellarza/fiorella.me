//= require_tree .

$(document).ready(function() {
  loadMediumPosts()
})

function loadMediumPosts() {
  // Using YQL here https://developer.yahoo.com/yql/ because Medium won't let me JSONP
  var yql_url = 'https://query.yahooapis.com/v1/public/yql'
  var url = 'https://medium.com/@damirkotoric/latest?format=json'
  $.ajax({
    url: yql_url,
    data: {
      'q': 'SELECT * FROM html WHERE url="'+url+'"',
      'format': 'json',
      'jsonCompat': 'new',
    },
    dataType: 'jsonp',
    success: function(data) {
      var html = $(data)[0].query.results.body
      var json = JSON.parse(html.substring(html.indexOf("{")))
      showPosts(json)
    },
  });
}

function showPosts(obj) {
  var source = $("#handlebars-posts").html()
  var template = Handlebars.compile(source)
  var posts = []
  for (var i=0; i < obj["payload"]["posts"].length; i++) {
    if (obj["payload"]["posts"][i]["inResponseToPostId"] == "") {
      post = {
        title: obj["payload"]["posts"][i]["title"],
        url: "https://medium.com/@damirkotoric/" + obj["payload"]["posts"][i]["uniqueSlug"],
        image_url: "https://cdn-images-1.medium.com/" + obj["payload"]["posts"][i]["virtuals"]["previewImage"]["imageId"]
      }
      posts.push(post)
    }
  }
  console.log(posts)
  var context = { 'posts': posts }
  var html = template(context)
  $("#posts").addClass("-loaded").find("> ul").append(html)
  $("#spinner").one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(e) {
    $(this).addClass("-hidden")
  });
}
