import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

import notes from "../../src/site/_data/notes.json" assert {type: 'json'}; 

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
      results: []
    };
    if(searchStr) {
      console.log("search for ", searchStr );
      filteredNotes.results = notes.filter(e => e.full_text.indexOf(searchStr) !== -1);
    }

    console.log(`results: ${filteredNotes.results.length}`);
    
    
    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      eleventyConfig.addGlobalData("filteredNotes", filteredNotes);
      eleventyConfig.addGlobalData("notes", notes);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
