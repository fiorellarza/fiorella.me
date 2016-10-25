//= require_tree .

$(document).ready(function() {
  loadMediumPosts()
})

function loadMediumPosts() {
  $.ajax({
    crossOrigin: true,
    url: "https://medium.com/@partidibambola/latest?format=json",
    context: {},
    success: function(data) {
      var json = JSON.parse(data.replace('])}while(1);</x>', ''))
      showPosts(json)
    }
  });
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
