import { gql } from '@apollo/client';

export const QUERY_GRAVITY_FORMS = gql`
query GravityForms {
  gfForms {
    nodes {
      formId
      title
      formFields {
        nodes {
          ... on SelectField {
            id
            choices {
              value
              text
            }
          }
        }
      }
    }
  }
}
`;

