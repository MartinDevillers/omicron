/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const Footer = () => (
  <footer
    sx={{
      boxSizing: `border-box`,
      display: `flex`,
      justifyContent: `space-between`,
      mt: [6],
      color: `secondary`,
      a: {
        variant: `links.secondary`,
      },
      flexDirection: [`column`, `column`, `row`],
      variant: `dividers.top`,
    }}
  >
    <div>
      &copy; {new Date().getFullYear()}{" "}
      <Link aria-label="Link to the author's website" href="https://devillers.nl/en/">
        Martin Devillers
      </Link>
      . All rights reserved.
    </div>
    <div>
      <Link
        aria-label="Link to the theme's GitHub repository"
        href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog"
      >
        Theme
      </Link>
      {` `}
      by
      {` `}
      <Link aria-label="Link to the theme author's website" href="https://www.lekoarts.de/en">
        LekoArts
      </Link>
    </div>
  </footer>
)

export default Footer
