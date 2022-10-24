<div align="center">
    <a href="https://badge.ttsalpha.com">
        <img src="public/logo.png" width="128" height="128" alt="logo"/>
    </a>
    <h1>Badge Generator</h1>
    <p>Generate Markdown badges for GitHub README</p>
</div>

## Example

[![e1][e1]][home-url]
[![e2][e2]][home-url]
[![e3][e3]][home-url]
[![e4][e4]][home-url]
[![e5][e5]][home-url]

## Query

```javascript
const example = {
    label: 'package',     // [Text]
    status: 'v1.2.3',     // [Text]
    color: 'teal',        // [Color RGB] or [Color Name] (default: 'blue')
    icon: 'npm',          // [Text] Use icon name in SimpleIcons.org
    labelColor: '444',    // [Color RGB] or [Color Name] (default: '333333')
    iconColor: 'e4e4e4'   // [Color RGB] or [Color Name] (default: '959da5')
}
```

## Author

Author: Son Tran

Info: [Personal Blog][ttsalpha-url] | [GitHub][github-url] | [Email][email-url]

Repo: [@ttsalpha/badge-generator][repo-url]

[ttsalpha-url]: https://ttsalpha.com

[github-url]: https://github.com/ttsalpha

[email-url]: mailto:ttsalpha@icloud.com

[repo-url]: https://github.com/ttsalpha/badge-generator

[home-url]: https://badge.ttsalpha.com

[e1]: https://badge.ttsalpha.com/api?icon=github&label=test&status=passing&color=green

[e2]: https://badge.ttsalpha.com/api?icon=npm&label=package&status=v1.2.3&color=teal

[e3]: https://badge.ttsalpha.com/api?label=license&status=GPL-3.0&color=pink

[e4]: https://badge.ttsalpha.com/api?icon=twitter&label=account&status=ttsalpha&color=1DA1F2&iconColor=1DA1F2

[e5]: https://badge.ttsalpha.com/api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue
