import { gql } from '@apollo/client';

export const QUERY_THEME_SETTINGS = gql`
query ThemeSettings {
  themeGeneralSettings {
    theme_settings {
      footerAddress
      footerCopyright
      footerDescription
      footerEmail
      footerImages {
        image {
          title
          sourceUrl
        }
      }
      footerLabelMenu1
      footerLabelMenu2
      footerLabelMenu3
      footerLogo {
        sourceUrl
        title
      }
      footerPhone
      footerSocials {
        socialLink
        socialIcon {
          title
          sourceUrl
        }
      }
      privacyLink {
        ... on Page {
          title
          slug
        }
      }
      buttonRepeater {
        variant
        iconColor
        icon {
          title
          sourceUrl
        }
        color
        button {
          url
          title
        }
      }
      headerLogo {
        title
        sourceUrl
      }
      headerLogoHomePage {
        title
        sourceUrl
      }
      formsSettings {
        formName
        formId
        fields {
          fieldId
          name
        }
      }
    }
  }
}`;
