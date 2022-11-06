# coding: utf-8

Gem::Specification.new do |spec|
  spec.name                    = "theme-jekyll"
  spec.version                 = "1.0.0"
  spec.authors                 = ["Start Bootstrap"]

  spec.summary                 = %q{Basic jekyll theme.}
  spec.metadata["plugin_type"] = "theme"

  spec.files                   = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|posts)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll"
  spec.add_runtime_dependency "jekyll-paginate"
  spec.add_runtime_dependency "jekyll-sitemap"
  spec.add_runtime_dependency "jekyll-gist"
  spec.add_runtime_dependency "jekyll-feed"
  spec.add_runtime_dependency "jekyll-data"
  spec.add_runtime_dependency "jekyll-redirect-from"
  spec.add_runtime_dependency "jemoji"

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "webrick"
  spec.add_development_dependency "github-pages"
end
