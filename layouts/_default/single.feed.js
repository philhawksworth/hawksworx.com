"posts" : [
  {
    'title': '{{ .Title }}',
    'date': '{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700"| safeHTML }}',
    'url' : '{{ .Permalink }}',
    'description' : '{{ .Summary | html }}',
    'content' : '{{ .Content }}',
  }
]
