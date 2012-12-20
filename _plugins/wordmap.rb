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
      input.gsub(/"/, "").gsub(/\./, "").gsub(/,/, "").downcase.split(" ").uniq.join(" ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::WordMap)


# Sanitise text to remove "s and remove duplicate words.
# Usefull for creating an index of unique words in a text
# entry for cheap javascript search.
#
# USAGE:    {{ STRING | wordmap }}
# Example:  {{ post.content | wordmap }}

module Jekyll
  module ParseComments



	# def sort_comments

	# 	response = HTTParty.get("http://getsimpleform.com/messages.json?api_token=dd1d7be99f54d7e61b3dc2f1c9d45b4e")
	# 	json = JSON.parse(response.body)

	# 	json.each { |item|
	# 		comments[item['referrer']] = item[data]
	# 	}

	# 	puts comments

	# end



	$c = Hash.new()
	$sorted = false

    def static_comments(url)


    	if $sorted == false
			url = "http://" + url + "/"
			comments = ""
			response = HTTParty.get("http://getsimpleform.com/messages.json?api_token=dd1d7be99f54d7e61b3dc2f1c9d45b4e")
			json = JSON.parse(response.body)
			json.each { |item|
				$c[item['referrer']] = item['data']['name']
			}
			$sorted = true
			puts $c
    	end





		# json.each { |item|
		# 	if item['referrer'] == url
		# 		puts "found a comment!"
		# 		comments += item['data']['message']
		# 	end
		# }

		comments = "no comments"
		return comments

    end
  end


end

Liquid::Template.register_filter(Jekyll::ParseComments)


