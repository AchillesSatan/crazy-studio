TruncateHtml.configure do |config|
  config.length        = 200
  config.omission      = '...(continued)'
  config.word_boundary = /\S[\.\?\!]/
end