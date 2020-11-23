# ProgriScript

ProgriScript is progressive web app that compiles, runs, and teaches the user about the ProgriScript language.

This repository is divided into several sections.

The Progressive Web App section is stored in the "src" folder, while the parser and virtual machine are stored in the "src/assets/scripts" folder.

## Progressive Web App

The "src" folder contains the code used to create the Progressive Web App that users interact with, using the Ionic Framework.

The "app" folder inside of it, contains the HTML and TypeScript file for each page of the web-app.

The assets folder contains the icons used by the application.

## Parser

Inside of the "src/assets/scripts" folder, the parser is found as "progriscript_jison.jison". This is a Jison file that is used to generate the "progriscript_jison.js" file used by the web-app.

## Virtual Machine

Inside of the "src/assets/scripts" folder, the virtual machine is found as "progriscript_vm.js". The web-app calls the virtual machine with the written code, which in turn calls the "progriscript_jison.js" file to obtain the intermediate code it needs to process.

## Development Installation Guide

- To install the necessary dependencies for the Progressive Web App, use "npm install" on the root folder. 
- Jison is also needed to compile the parser, so use "npm install jison". 
- If changes are made to the Jison file, compile a new JavaScript version by going to the "src/assets/scripts folder" and running the following command: "jison progriscript_jison.jison". This JavaScript file will be used by the Virtual Machine. 
- To compile the Progressive Web App for development, run the "ionic serve" command. To compile a production version, run "ionic build --prod".

## GitHub Pages Link

A live version of ProgriScript can be found at https://jimmygzzmtz.github.io/ProgriScript.