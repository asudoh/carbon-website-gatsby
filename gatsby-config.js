require('dotenv').config();

const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Carbon Design System',
  },
  pathPrefix: `/carbon-website-gatsby`,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carbon Design System`,
        short_name: `Carbon`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `src/content/global/images/favicon-32.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
         `gatsby-remark-component`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          "gatsby-remark-copy-linked-files",
          {
            resolve: 'gatsby-remark-embedded-codesandbox',
            options: {
              directory: `${__dirname}/src/content`,
              // Optional:

              // Custom protocol for parsing the embedding link
              // default:
              protocol: 'embedded-codesandbox://',

              // Customise Codesandbox embedding options:
              // https://codesandbox.io/docs/embedding#embed-options
              // default:
              embedOptions: {
                view: 'preview',
                hidenavigation: 1,
              },

              // Customise the embedding iframe given the generated url
              // default:
              getIframe: url => `<iframe src="${url}" class="embedded-codesandbox" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`
        
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
  ],
};
