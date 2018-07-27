import React from 'react';

class SearchableText extends React.Component {
  shouldComponentUpdate(nextProps) {
       const differentText = this.props.text !== nextProps.text;
       const differentSearchText = this.props.searchText !== nextProps.searchText;
       const differentRegisterMatch = nextProps.registerMatch !== this.props.registerMatch;
       return differentText || differentSearchText || differentRegisterMatch;
   }

  render() {
    console.log('render!!!')

    const {text, searchText} = this.props;
    if (searchText.length < 2) {
      return text;
    }

    const splitText = text.split(searchText);

    const els = [];
    splitText.forEach((text, index) => {
      els.push(<span key={`text-${index}`}>{text}</span>);
      if (index === splitText.length - 1) {
        return;
      }

      const match = <span className="highlight"
                          key={`text-match-${index}`}
                          ref={matchEl => this.props.registerMatch(matchEl)}>
                      {searchText}
                    </span>;
      els.push(match);
    })

    return els;
  }
}

export default SearchableText;
