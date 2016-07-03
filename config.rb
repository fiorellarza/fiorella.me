###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  activate :directory_indexes
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end


# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  activate :favicon_maker, :icons => {
    "images/_favicon_template.png" => [
      { icon: "images/apple-touch-icon-152x152-precomposed.png" },
      { icon: "images/apple-touch-icon-144x144-precomposed.png" },
      { icon: "images/apple-touch-icon-114x114-precomposed.png" },
      { icon: "images/apple-touch-icon-72x72-precomposed.png" },
      { icon: "images/favicon.png", size: "16x16" },
      { icon: "images/favicon.ico", size: "64x64,32x32,24x24,16x16" },
    ]
  }

  activate :directory_indexes
end

activate :deploy do |deploy|
  deploy.build_before = true # default: false
  deploy.deploy_method = :git
  # Optional Settings
  deploy.remote   = 'https://github.com/fiorellarza/fiorella.git'
  deploy.branch   = 'gh-pages'
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end
