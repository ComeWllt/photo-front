# Front-end of MyPhoto

This is the front-end of a photo gallery website. 
This is a personnal project to share my photos with friends and family. <br>
The website is fully responsive. 
This project is still in development, which means more features may be added in the future.

## Modules

Run `npm install` from the app directory to install modules.

## Development mode

Run `npm start` to get the app in the development mode.<br>
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

## Dependencies

- The [Cloudinary](https://cloudinary.com/documentation/solution_overview) API, as my photos are stored on Cloudinary. 
- Google Maps API, to show where the photos have been taken.
- [Semantic UI React](https://react.semantic-ui.com).

## Architecture

Everything happens in the folder `src`.
- `App.js` is the root main Component.
- The folder `components` holds the components called by `App.js`.
- The folder `config` holds the back API adress and different APIs keys. 
- The folder `styles` holds the css files.
- The folder `images` holds different useful images.
