import express from "express"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import axios from "axios"
import { XMLParser } from "fast-xml-parser"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan("combined"))

// Variables
const FEED_URL = process.env.FEED_URL || "https://blog.stilwell.dev/feed"
const PORT = process.env.PORT || 3000

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
})

app.get("/", async (req, res) => {
  try {
    // Fetch the RSS feed
    const response = await axios.get(FEED_URL)

    // Parse the XML
    const result = parser.parse(response.data)

    // Extract only title, link, and published from the feed
    const posts = result.feed.entry.map((entry) => {
      const links = Array.isArray(entry.link) ? entry.link : [entry.link]
      return {
        title: entry.title,
        link: links.find((l) => l["@_rel"] === "alternate")["@_href"],
        published: entry.published,
      }
    })

    // Send JSON response
    res.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    res.status(500).json({ error: "Failed to fetch blog posts" })
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Graceful shutdown handler
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl+C)")

  server.close(() => {
    console.log("HTTP server closed")
    process.exit(0)
  })

  // If server hasn't finished in 5 seconds, force shutdown
  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down")
    process.exit(1)
  }, 5000)
})
