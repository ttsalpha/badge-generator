<div align="center">
    <img src="public/logo.png" width="128" height="128" alt=""/>
    <h1>Badge Generator</h1>
    <p>Create a badge can be included in GitHub README or any other web page.</p>
</div>

## Example

[![e1][e1]][home-url]
[![e2][e2]][home-url]
[![e3][e3]][home-url]
[![e4][e4]][home-url]
[![e5][e5]][home-url]

## Query

```javascript
const badge = {
    label: 'npm',         // [Text]
    status: 'v1.2.3',     // [Text]
    color: 'blue',        // [Color RGB] or [Color Name] (default: 'blue')
    icon: 'npm',          // [Text] Use icon name in SimpleIcons.org
    iconColor: 'eeeeee',  // [Color RGB] or [Color Name] (default: '959da5')
    labelColor: '444'     // [Color RGB] or [Color Name] (default: '333333')
}
```

## Meta

Author: Son Tran

Info: [Personal Blog][ttsalpha-url] | [Github][github-url] | [Email][email-url]

Repo: [@ttsalpha/badge-generator][repo-url]

[ttsalpha-url]: https://ttsalpha.github.io

[github-url]: https://github.com/ttsalpha

[email-url]: mailto:ttsalpha@icloud.com

[repo-url]: https://github.com/ttsalpha/badge-generator

[home-url]: https://badge-generator.vercel.app

[e1]: https://badge-generator.vercel.app/api?icon=github&label=test&status=passing&color=green

[e2]: https://badge-generator.vercel.app/api?icon=npm&label=package&status=v1.3.2&color=teal

[e3]: https://badge-generator.vercel.app/api?label=license&status=GPL-3.0&color=pink

[e4]: https://badge-generator.vercel.app/api?icon=twitter&label=account&status=ttsalpha&color=1DA1F2&iconColor=1DA1F2

[e5]: https://badge-generator.vercel.app/api?icon=typescript&iconColor=white&label=TypeScript&labelColor=blue
