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



# <h2>comments</h2>

# <p>title: {{ site.url }} {{ page.url }} </p>

# <form action="http://getsimpleform.com/messages?form_api_token={{ site.apitoken }}" method="post">
#   <input type='hidden' name='redirect_to' value='{{ site.url }}/{{ page.url }}' />
#   <label for='name'>Name</label>
#   <br />
#   <input type='text' id='name' name='name' placeholder='Your Name' />
#   <br />
#   <label for='email'>Email</label>
#   <br />
#   <input type='text' id='email' name='email' placeholder='Your Email' />
#   <br />
#   <label for='email'>Message</label>
#   <br />
#   <textarea id='message' name='message' placeholder='Message' rows='8' cols='50'></textarea>
#   <br />
#   <input type='submit' value='Submit' />
# </form>

# {% assign url = page.url  %}


# {% capture url %}{{ site.url }}{{ page.url }}{% endcapture %}

# {{ url | static_comments}}
