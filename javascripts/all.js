//= require_tree .

$(document).ready(function() {
  loadMediumPosts()
})

// $.ajax({
//     url: 'https://medium.com/@partidibambola/latest?format=json',
//     success: function(data) {
//       console.log(data)
//     },
//   });

function loadMediumPosts() {
  // Using YQL here https://developer.yahoo.com/yql/ because Medium won't let me JSONP
  var yql_url = 'https://query.yahooapis.com/v1/public/yql'
  var url = 'https://medium.com/@partidibambola/latest?format=json'
  $.ajax({
    url: 'https://medium.com/@partidibambola/latest?format=json',
    dataFormat: 'jsonp',
    data: {
      'format': 'jsonp',
      'type': 'post'
    },
    success: function(data) {
      var $html = $(data)
      //console.log(JSON.parse($html.substring($html.indexOf("{"))))
      console.log(data)
    }
  });

  // $.ajax({
  //   url: 'https://medium.com/@partidibambola/latest?format=json',
  //   data: {
  //     'format': 'json',
  //     'type': 'post'
  //   },
  //   success: function(data) {
  //     var $html = $(data)
  //     //console.log(JSON.parse($html.substring($html.indexOf("{"))))
  //     console.log(data)
  //   },
  // });

  // $.ajax({
  //   url: yql_url,
  //   data: {
  //     'q': 'SELECT * FROM html WHERE url="'+url+'"',
  //     'format': 'json',
  //     'jsonCompat': 'new',
  //     'debug': 'true',
  //     'diagnostics': 'true'
  //   },
  //   dataType: 'jsonp',
  //   success: function(data) {
  //     console.log(data)
  //     var html = $(data)[0].query.results.body
  //     var json = JSON.parse(html.substring(html.indexOf("{")))
  //     showPosts(json)
  //   },
  // });
}

function showPosts(obj) {
  var source = $("#handlebars-posts").html()
  var template = Handlebars.compile(source)
  var jsonPosts = $(obj["payload"]["references"]["Post"])[0]
  var posts = []
  $.each(jsonPosts, function(key, value) {
    $jsonPost = $(value)[0]
    console.log($jsonPost)
    if ($jsonPost["inResponseToPostId"] == "") {
      post = {
        title: $jsonPost["title"],
        url: "https://medium.com/@damirkotoric/" + $jsonPost["uniqueSlug"],
        image_url: "https://cdn-images-1.medium.com/" + $jsonPost["virtuals"]["previewImage"]["imageId"]
      }
      posts.push(post)
    }
  })
  console.log(posts)
  var context = { 'posts': posts }
  var html = template(context)
  $("#posts").addClass("-loaded").find("> ul").append(html)
  $("#spinner").one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(e) {
    $(this).addClass("-hidden")
  });
}
