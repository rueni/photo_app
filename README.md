# Photolog

### About

Photolog is a SPA application using the Instagram and Google Maps API. It features a search query to allow the user to retrieve Instagram images based on the following parameters: Username | Location | Hashtag | Likes

---
### Stack:

Application will be built on the MEAN stack (minus the database).  Express/Node + Angular or Backbone OR react.js and socket.io?

Node Packages:
- https://github.com/mckelvey/instagram-node-lib
- https://www.npmjs.com/package/instagram-node
- https://www.npmjs.com/package/socket.io
        
Instagram API —> RESTful API or Realtime API?
- If RESTful —> Use either Angular/Backbone/React
- If Realtime API —> Use socket.io to stream images?

----
### View/Controller:

The application will be a SPA with 3-4 separate views

**Required:**

- Search box within map view...
    - by user | by hashtag | by # of likes
- Map view
    - User should be able to drop a pin on the map —> Map should populate with a image thumbnails based on user parameters
    - Default results will be based on popularity (# of likes)
- Image results
    - Results panel should fetch X number of images from the API
    
*Optional:*

- User authentication —> OAuth login using users Instagram account to render images from the users Instagram feed
