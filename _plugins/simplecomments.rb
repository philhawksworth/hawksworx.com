# require 'rubygems'
# require 'httparty'
# require 'json'
# require 'yaml'
# require 'jekyll'

# # From http://api.rubyonrails.org/classes/ActiveSupport/CoreExtensions/Hash/Keys.html
# class Hash
#   def stringify_keys!
#     keys.each do |key|
#       self[key.to_s] = delete(key)
#     end
#     self
#   end
# end



# # Usage:
# #
# # {% simplecomments %}
# #     <div>
# #         <h3>{{ item.name }} </h3>
# #         <h4>{{ item.date }}</h4>
# #         <div>{{ item.message }}</div>
# #     </div>
# # {% endsimplecomments %}

# module Jekyll
#   class SimpleComments < Liquid::Block

#     include Liquid::StandardFilters
#     Syntax = /(#{Liquid::QuotedFragment}+)?/

#     def initialize(tag_name, markup, tokens)

#       # get data or use a cache
#       ttl = 10
#       cache_dir = '_simpleform_cache'
#       cache_file = File.join(cache_dir, 'comments.yml')
#       FileUtils.mkdir_p(cache_dir) if !File.directory?(cache_dir)

#       age_in_seconds = Time.now - File.stat(cache_file).mtime if File.exist?(cache_file)

#         if age_in_seconds.nil? || age_in_seconds > ttl
#             puts "Stale cache: #{cache_file} #{age_in_seconds}. Getting fresh data"
#             response = HTTParty.get("http://getsimpleform.com/messages.json?api_token=dd1d7be99f54d7e61b3dc2f1c9d45b4e")
#             json = JSON.parse(response.body)
#             @data = Hash.new

#             # create an array for every page that appears as a referrer
#             json.each { |item|
#                 @data[item['referrer']] = []
#             }

#             # populate the referrer arrays with comments
#             json.each { |item|
#                 comment = Hash.new
#                 comment['date'] = item['created_at']
#                 comment['name'] = item['data']['name']
#                 comment['email'] = item['data']['email']
#                 comment['uri'] = item['data']['uri']
#                 comment['message'] = item['data']['message']
#                 @data[item['referrer']].push(comment)
#             }

#             # stash the data in a file
#             File.open(cache_file, 'w') { |out| YAML.dump(@data, out) }
#         else
#             puts "Cache is still fresh"
#             @data = YAML::load_file(cache_file)
#         end
#       super
#     end

#     def render(context)
#         context.registers[:comments] ||= Hash.new(0)

#         # construct the uri for the referring page we are checking comments for
#         domain = context.environments.first["site"]['url']
#         path = context.environments.first["page"]['url']
#         port = domain == "hawksworx.com" ? "" : ":8000"
#         page = "http://" + domain + port + path + "/"

#         collection = @data[page]
#         result = []

#         if collection.nil?
#             puts  "no comments for #{page}"
#         else
#             # loop through found comments and render results
#             length = collection.length
#             puts " #{length} comments for this #{page}"

#             # loop through found bookmarks and render results
#             context.stack do
#                 collection.each_with_index do |item, index|
#                     context['item'] = item.stringify_keys! if item.size > 0
#                     result << render_all(@nodelist, context)
#                 end
#             end
#         end
#         result
#     end

#   end
# end

# Liquid::Template.register_tag('simplecomments', Jekyll::SimpleComments)

