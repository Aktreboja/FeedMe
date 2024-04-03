<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->





<!-- PROJECT LOGO -->
<br />
<div align="center">
<!--   <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">FeedMe</h1>

  <p align="center">
    A yelp powered application dedicated to finding location-specific businesses at a fraction of the time
<!--     <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

FeedMe is a web application that utilizes Yelp's fusion API to provide business results that can be saved and shared by users.

### Problem Statement
The main problem being solved is how whenever you would visit or explore a new area, it can be a little hard to lock down a place to visit.
The main goal of FeedMe will take in concepts from both Yelp and LinkTree, and ultimately allow a user to save their favorite locations in a given area; while also being given a link
where others can view and view what they have saved. 

<strong><i>From an influencer standpoint, you're showcasing what YOU love in a given area, which gives those businesses that much exposure.</i></strong>

Some current features include:
  1. Being able to search and view businesses by inputting a business name and location
  2. View the location of where the business on a Google Map


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TailwindCSS][tailwindcss]][tailwindcss-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Redux][redux]][redux-url]
* [![FastAPI][fastapi]][fastapi-url]
* [![Postgres][postgres]][postgres-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g

  # pnpm
  npm install pnpm -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. API keys initialization
   - Google Maps (JavaScript API)
      - You will need to create an account on Google Cloud Platform (GCP) if you haven't already, and then create credentials to use google maps. Refer to this link to get started: https://developers.google.com/maps/documentation/javascript/get-api-key
      - You will need to add environment variable to your .env file (<strong>NEXT_PUBLIC_GOOGLE_MAPS_ID</strong>)
      - Note: Make sure to add accepted urls that the API key can be used to avoid unauthorized usage.
      - ```ts
        {/* Here is where the google Maps ID environment variable will be plugged in for reference*/}
        <Map 
            {...cameraOptions} 
            mapId={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}`} 
            onCenterChanged={centerHandler}
            onZoomChanged={centerHandler}
           >
            {/* <AdvancedMarker  position = {defaultPosition}/> */}
            {
                markerCoords && <AdvancedMarker  position = {markerCoords} />
            }
        </Map>
        ```
     - Yelp Fusion API
       - You will need to set up a yelp developer account to get the <strong>YELP_CLIENT_ID and YELP_API_KEY </strong> env variables, link to get started here: https://docs.developer.yelp.com/docs/fusion-intro
        
3. Clone the repo
   ```sh
   git clone https://github.com/Aktreboja/FeedMe.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Set up virtualenv for FastAPI api:
    ```sh
    python -m venv .venv

    # Windows
    \.venv\Scripts\activate

    # MacOS
    source .venv/bin/activate
    ```
6. Enter your API in `.env`
   ```env
    # Yelp Environment Variables
    YELP_CLIENT_ID = ''
    YELP_API_KEY = ''
    
    
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =''
    NEXT_PUBLIC_GOOGLE_MAPS_ID = ''
   ```

7. Run the application (or specific portions of it
    ```sh
    # Runs the full application
    pnpm run dev

    # Runs the flask api server
    pnpm run fastapi-dev

    # Runs the nextjs app
    pnpm run next-dev
    ```
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Refactor Dashboard page for skeleton loading
- [ ] Add Persisted favorited businesses functionality
- [ ] Add user functionality with Postgres
- [ ] Save favorited businesses to Postres
- [ ] Generate Unique user name / uuid for sharing


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Previews

### Landing Page

![image](https://github.com/Aktreboja/FeedMe/assets/15055373/e20880ca-c6dc-411f-a8e5-3fb01b7fc92b)


### Dashboard Page

![image](https://github.com/Aktreboja/FeedMe/assets/15055373/401e7829-af50-4c11-a6be-10943f9ef2a7)


### Dashboard Page (After searching)

![image](https://github.com/Aktreboja/FeedMe/assets/15055373/7882b8a1-bfb9-4aaf-a0da-080981f09246)

### Dashboard (Clicking a business)

![image](https://github.com/Aktreboja/FeedMe/assets/15055373/53819271-6cca-421c-b86b-db0f391b9219)



<!-- CONTACT -->
## Contact

Aldrich Reboja - aktreboja@gmail.com

Project Link: [https://github.com/aktreboja/NBAStatTracker](https://github.com/aktreboja/NBAStatTracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aktreboja
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[tailwindcss]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[tailwindcss-url]: https://tailwindcss.com/
[redux]: https://img.shields.io/badge/redux-593d88?style=for-the-badge&logo=redux
[fastapi]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[fastapi-url]:https://fastapi.tiangolo.com/
[postgres]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/
[redux-url]:https://redux.js.org/
