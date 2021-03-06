const path = require('path');
const paths = require('./paths');
const { createFilePath } = require(`gatsby-source-filesystem`);
const publicPath = '/';

// Method that creates nodes based on the file system that we can use in our templates
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // If the node type (file) is a markdown file
  if (node.internal.type === 'MarkdownRemark') {
    const dir = path.resolve(__dirname, '');
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `content`, trailingSlash: false });
    const currentPage = slug.split('/').pop();

    // example
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    // example: react
    createNodeField({
      node,
      name: `currentPage`,
      value: currentPage,
    });
  }
};

// Method that creates the pages for our website
exports.createPages = ({ actions, graphql }) => {
  const { createRedirect, createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                currentPage
              }
              frontmatter {
                tabs
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const slug = node.fields.slug;
        const currentPage = node.fields.currentPage;
        const tabs = node.frontmatter.tabs === null ? [] : node.frontmatter.tabs;
        let currentPath = node.frontmatter.tabs === null ? slug.slice(0, slug.lastIndexOf(currentPage)) : slug;
        createPage({
          path: currentPath,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            slug,
            currentPage,
          },
        });
        if (tabs.length > 1) {
          const current = tabs[0].toLowerCase().replace(' ', '-');
          currentPath = currentPath.slice(0, currentPath.lastIndexOf(current));
          createRedirect({
            fromPath: `${currentPath}`,
            redirectInBrowser: true,
            toPath: `${currentPath}${current}`,
          });
          createRedirect({
            fromPath: `${currentPath.slice(0, currentPath.length - 1)}`,
            redirectInBrowser: true,
            toPath: `${currentPath}${current}`,
          });
        }
        resolve();
      });
    });
  });
};

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    entry: {
      main: [require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs],
      'carbon-components': paths.carbonComponentsIndexJs,
    },
    output: {
      path: paths.appBuild,
      pathinfo: true,
      filename: 'static/js/[name].js',
      publicPath: publicPath,
      library: ['CDS', '[name]'],
      libraryTarget: 'var',
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          loaders: ['html-loader', 'markdown-loader'],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: false,
          },
        },
      ],
    },
  })
}