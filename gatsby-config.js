require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Big O Visualizer`,
    // Default title of the page
    siteTitleAlt: `Big O Visualizer by Martin Devillers`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Big O Visualizer by Martin Devillers`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://omi.cr`,
    // Used for SEO
    siteDescription: `Visualize the time complexity of algorithms.`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.png`,
    // Twitter Handle
    author: `@MartinDevillers`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Docs`,
            slug: `/docs`,
          },
          {
            title: `Demo`,
            slug: `/demo`,
          },
          {
            title: `Live`,
            slug: `/live`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/devillers`,
          },
          {
            name: `GitHub`,
            url: `https://github.com/MartinDevillers/omicron/`,
          },
        ],
        feedTitle: 'Big O Visualizer by Martin Devillers'
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Big O Visualizer`,
        short_name: `Big O Vis`,
        description: `Visualize the time complexity of algorithms.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
