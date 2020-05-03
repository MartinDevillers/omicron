/** @jsx jsx */
import { jsx } from "theme-ui"
import { Flex, Heading, Link as TLink } from "@theme-ui/components"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import Layout from "./layout"
import DoublyLinkedLoop from "../../../util/doubly-linked-loop"

type PageProps = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
      body: string
    }
  }
}

// @todo hard coded until I figure out a better way to do this (maybe frontmatter prev/next properties?)
const pages = new DoublyLinkedLoop([
  "/docs",
  "/demo",
  "/sorting/bubble-sort",
  "/sorting/selection-sort",
  "/sorting/insertion-sort",
  "/sorting/counting-sort",
  "/sorting/quick-sort",
  "/sorting/merge-sort",
  "/sorting/heap-sort",
  "/sorting/tim-sort",
  "/live",
  "/about",
])

const PrevNextNav = (section: DoublyLinkedLoop<string>, slug: string) =>
  section.contains(slug) && (
    <Flex pt={[1, 2, 3]}>
      <TLink as={Link} sx={{ variant: `links.secondary` }} to={section.prev(slug)!} alt="Previous page">
        <div sx={{ variant: `icons.arrow`, transform: `rotate(225deg)` }} />
      </TLink>
      <div sx={{ variant: `icons.dot` }} />
      <TLink as={Link} sx={{ variant: `links.secondary` }} to={section.next(slug)!} alt="Next page">
        <div sx={{ variant: `icons.arrow`, transform: `rotate(45deg)` }} />
      </TLink>
    </Flex>
  )

const Page = ({ data: { page } }: PageProps) => (
  <Layout>
    <SEO title={page.title} description={page.excerpt} />
    <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
      <Heading variant="styles.h2">{page.title}</Heading>
      {PrevNextNav(pages, page.slug)}
    </Flex>
    <section sx={{ my: 5 }}>
      <MDXRenderer>{page.body}</MDXRenderer>
    </section>
  </Layout>
)

export default Page
