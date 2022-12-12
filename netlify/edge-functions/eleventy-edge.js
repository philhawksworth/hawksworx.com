import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

import notes from "../../src/site/_data/social_archive.json" assert {type: 'json'}; 
import dateDisplay from "../../src/site/_filters/edgeFilters/dates.js";
import socialLink from "../../src/site/_filters/edgeFilters/socialLink.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });
    
    const url = new URL(request.url);
    let filteredNotes = {
      filter: "",
      results: notes
    };
    
    const searchStr = url.searchParams.get("str");

    // if there is an empty str param, ignore the search and go to the notes page
    for (const [key, value] of url.searchParams.entries()) {
      if(key == "str" && value == "") {
        return Response.redirect(`${url.origin}/notes`, 302);
      }
    }
    
    // if there is not str at all, we can ignore
    if(!searchStr) {
      return context.next();
    }
  
    filteredNotes.filter = searchStr;
    filteredNotes.results = notes.filter(e => e.full_text.toLowerCase().indexOf(searchStr.toLocaleLowerCase()) !== -1);
  
    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      eleventyConfig.addFilter("dateDisplay", dateDisplay);
      eleventyConfig.addShortcode("socialLink", socialLink);
      eleventyConfig.addGlobalData("filteredNotes", filteredNotes);
      eleventyConfig.addGlobalData("notes", notes);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
