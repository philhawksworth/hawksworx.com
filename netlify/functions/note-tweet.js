const pageTemplate = require('./page/template.js');
const notes = require('../../src/site/_data/social_archive.json');
const { builder } = require('@netlify/functions');

const handler = async(event) => {
  
    const re = /note\/(tw|mstdn)\/(.+)/gm;

    const match = [...event.path.matchAll(re)];
    const noteID = match[0][2]
    
    console.log(`lookup ${noteID}`);

    const note = notes.find(x => x.id === noteID)
    if(!note) {
      console.log('Not found:', noteID);
      return {

        statusCode: 301,
        headers: {
          Location: `/notes/`,
        }
      };
      
    } else {
      return {
          statusCode: 200,
          headers: {
              "Content-Type": "text/html",
          },
          body: pageTemplate(note)
      }
    }
}

exports.handler = builder(handler);
