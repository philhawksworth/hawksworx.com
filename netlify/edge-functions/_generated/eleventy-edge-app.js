import { EleventyEdge } from "https://cdn.11ty.dev/edge@2.0.1/eleventy-edge.js";

const precompiledAppData = { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:e443ba3b23a2249883e3712117aa9b3ff1ca79e9e5c91e0a854d3ba5a9b2ecee": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filteredNotes")),"results");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("post", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\n<div class=\"social-post\">\n\n  <a href=\"https://twitter.com/philhawksworth\" class=\"avatar\"><img src=\"/images/philhawksworth-goon.jpg\" alt=\"A photo of Phil Hawksworth's face\"></a>\n\n<div class=\"main\">\n\n  <div class=\"meta\">\n    <span class=\"author-name\">Phil Hawksworth</span>\n    <a href=\"https://twitter.com/philhawksworth\" class=\"author-handle\">@philhawksworth</a> &#8226;\n    <time datetime=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"created_at"), env.opts.autoescape);
output += "\"><a href=\"https://twitter.com/philhawksworth/status/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(env.getFilter("dateDisplay").call(context, runtime.memberLookup((t_4),"created_at")), env.opts.autoescape);
output += "</a></time>\n\n    ";
if(runtime.memberLookup((t_4),"in_reply_to_status_id")) {
output += "\n      replying to <a href=\"https://twitter.com/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"in_reply_to_screen_name"), env.opts.autoescape);
output += "/status/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"in_reply_to_status_id"), env.opts.autoescape);
output += "\">this from @";
output += runtime.suppressValue(runtime.memberLookup((t_4),"in_reply_to_screen_name"), env.opts.autoescape);
output += "</a>\n    ";
;
}
output += "\n  </div>\n  <div class=\"content\">";
output += runtime.suppressValue(env.getFilter("safe").call(context, (lineno = 19, colno = 51, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_4),"full_text")),"replaceAll"), "post[\"full_text\"][\"replaceAll\"]", context, ["\n","<br />"]))), env.opts.autoescape);
output += "</div>\n  <div class=\"media\">\n    ";
frame = frame.push();
var t_7 = runtime.memberLookup((t_4),"media");
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("item", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n      <img src=\"";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\" alt=\"Embedded image from Twitter\" />\n    ";
;
}
}
frame = frame.pop();
output += "\n\n  </div>\n  <ul class=\"permalinks\">\n    <li><a href=\"/note/tw/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\">Permalink</a></li> |\n    <li><a href=\"https://twitter.com/philhawksworth/status/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\">Twitter</a></li>\n  </ul>\n\n  </div>\n</div>\n\n\n";
;
}
}
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
}()),
} };

export { EleventyEdge, precompiledAppData }