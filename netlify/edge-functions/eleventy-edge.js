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
    const searchStr = url.searchParams.get("str");

    let filteredNotes = {
      filter: searchStr,
      results: notes
    };
    if(searchStr) {
      console.log("search for ", searchStr );
      filteredNotes.results = notes.filter(e => e.full_text.indexOf(searchStr) !== -1);
    }


    
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
