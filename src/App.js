import React from "react";
import { marked } from 'marked';

let defaultStr = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultStr
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
    })
  }
  render() {
    const html = marked.parse(this.state.input);
    const renderer = {
      paragraph(text) {
        const brText = text.replace(/\n/g, `<br>`);
        return `<p>${brText}</p>`;
      }
    };
    marked.use({renderer});
    
    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="box left-box col-3">
          <label htmlFor="editor" className="form-label">Editor</label>
          <textarea id="editor" className="form-control" value={this.state.input} onChange={this.handleChange}></textarea>
        </div>
        <div className="col-1"></div>
        <div className="box right-box col-6">
          <label htmlFor="preview" className="form-label">Previewer</label>
          <div id="preview" className="form-control" dangerouslySetInnerHTML={{__html: marked.parse(this.state.input)}}></div>
        </div>
        <div className="col-1"></div>        
      </div>
    );
  }
}

export default App;