import { gql } from '@apollo/client';

export const QUERY_PAGE_BY_SLUG = gql`
  query PageBySlug($slug: String!) {
	   pageBy(uri: $slug) {
	    slug
	    title
	    pageId
	    blocks {
	      attributesJSON
	      blockImage {
	        json
	      }
	    }
	    seo {
	      opengraphDescription
	      opengraphTitle
	      opengraphUrl
	      schema {
	        raw
	      }
	    }
	  }
  }
`;

export const QUERY_POSTS = gql`
query Posts {
  posts {
    nodes {
      slug
      title
      postId
      acf_single_post {
        singlePostContent
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          categoryId
          name
          slug
        }
      }
      excerpt
      featuredImage {
        node {
          title
          sourceUrl
        }
      }
      date
      blocks {
	      attributesJSON
	      blockImage {
	        json
	      }
	    }
	    seo {
	      opengraphDescription
	      opengraphTitle
	      opengraphUrl
	      schema {
	        raw
	      }
	    }
    }
  }
}
`;

export const QUERY_POSTS_AND_PAGES_SEO = gql`
query SeoPages {
  pages {
    nodes {
      slug
      modified
    }
  }
  posts {
    nodes {
      slug
      modified
    }
  }
}
`;