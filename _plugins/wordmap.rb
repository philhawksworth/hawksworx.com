require 'httparty'
require 'json'

# Sanitise text to remove "s and remove duplicate words.
# Usefull for creating an index of unique words in a text
# entry for cheap javascript search.
#
# USAGE:    {{ STRING | wordmap }}
# Example:  {{ post.content | wordmap }}

module Jekyll
  module WordMap
    def wordmap(input)
      str = input.gsub(/"/, "").gsub(/\./, "").gsub(/,/, "").downcase
      str = str.split(' tagged', 2).last
      words = str.split(" ")
		words.delete_if {|x| x == "a" }
		words.delete_if {|x| x == "an" }
		words.delete_if {|x| x == "and" }
		words.delete_if {|x| x == "on" }
		words.delete_if {|x| x == "in" }
		words.delete_if {|x| x == "it" }
		words.delete_if {|x| x == "of" }
		words.delete_if {|x| x == "if" }
		words.delete_if {|x| x == "for" }
		words.delete_if {|x| x == "the" }
		words.delete_if {|x| x == "i" }
		words.delete_if {|x| x == "is" }
		words.delete_if {|x| x == "i'm" }
		words.delete_if {|x| x == "i'd" }
		words.delete_if {|x| x == "it's" }
		words.delete_if {|x| x == "or" }
		words.delete_if {|x| x == "to" }
		words.delete_if {|x| x == "me" }
		words.delete_if {|x| x == "be" }
		words.delete_if {|x| x == "not" }
		words.delete_if {|x| x == "was" }
		words.delete_if {|x| x == "do" }
		words.delete_if {|x| x == "so" }
		words.delete_if {|x| x == "at" }
      words.uniq.join(" ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::WordMap)
