# Business News for Grafana

![Dashboard](https://raw.githubusercontent.com/VolkovLabs/business-news/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-11.4-orange)
![CI](https://github.com/volkovlabs/business-news/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/business-news/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/business-news/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/business-news)
[![CodeQL](https://github.com/VolkovLabs/business-news/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-news/actions/workflows/codeql-analysis.yml)

## Introduction

The Business News data source is a plugin for Grafana that retrieves RSS and Atom feeds and allows visualizing them using Business Text and other panels.

[![Business News data source for Grafana | News feed tutorial for Grafana Dashboard](https://raw.githubusercontent.com/volkovlabs/business-news/main/img/video.png)](https://youtu.be/RAxqS2hpWkg)

## Requirements

- Business News data source 4.X requires **Grafana 10.1** or **Grafana 11**.
- RSS/Atom data source 3.X requires **Grafana 9** or **Grafana 10**.
- RSS/Atom data source 2.X requires **Grafana 8.5** or **Grafana 9**.
- RSS/Atom data source 1.X requires **Grafana 8**.

## Getting Started

The Business News data source can be installed from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/volkovlabs-rss-datasource/) or utilizing the Grafana command line tool.

For the latter, please use the following command.

```bash
grafana-cli plugins install volkovlabs-rss-datasource
```

## Highlights

- Supports RSS 2.0, RSS 1.0 and Atom.
- Works with Dynamic Text visualization panel.
- Returns Channel (Feed) data, Items (Entries) or both as separate data frames.
- Extract and parse as additional fields:
  - Image from Meta.
  - H4 and Image from the Encoded content.
  - Media:Group for YouTube.
- Filter items/entries based on the selected Time Range.
- Allows specifying Query parameters with dashboard variables.

## Documentation

| Section                                                                   | Description                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Business Text](https://volkovlabs.io/plugins/business-news/text/)        | Demonstrates how to display feed using Dynamic Text panel.   |
| [Provisioning](https://volkovlabs.io/plugins/business-news/provisioning/) | Demonstrates how to automatically provision the data source. |
| [Release Notes](https://volkovlabs.io/plugins/business-news/release/)     | Stay up to date with the latest features and updates.        |

## Business Suite for Grafana

The Business Suite is a collection of open source plugins created and actively maintained by Volkov Labs.

The collection aims to solve the most frequent business tasks by providing an intuitive interface with detailed written documentation, examples, and video tutorials.

[![Business Suite for Grafana](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

### Enterprise Support

With the [Business Suite Enterprise](https://volkovlabs.io/pricing/), you're not just getting a product, you're getting a complete support system. You'll have a designated support team ready to tackle any issues.

You can contact us via Zendesk, receive priority in feature requests and bug fixes, meet with us for in-person consultation, and get access to the Business Intelligence. It's a package that's designed to make your life easier.

## Always happy to hear from you

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/business-news/issues).
- Subscribe to our [YouTube Channel](https://youtube.com/@volkovlabs) and leave your comments.
- Become a [Business Suite sponsor](https://github.com/sponsors/VolkovLabs).

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-news/blob/main/LICENSE).
