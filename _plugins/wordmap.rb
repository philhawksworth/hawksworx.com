# Sanitise text to remove "s and remove duplicate words.
# Usefull for creating an index of unique words in a text
# entry for cheap javascript search.
#
# USAGE:    {{ STRING | wordmap }}
# Example:  {{ post.content | wordmap }}

module Jekyll
  module WordMap
    def wordmap(input)
      input.gsub(/"/, "").gsub(/\./, "").gsub(/,/, "").downcase.split(" ").uniq.join(" ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::WordMap)


