"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opensearchResponse = void 0;

const opensearchResponse = baseUrl => {
  return `
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>Outline</ShortName>
  <Description>Search Outline</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16" type="image/x-icon">${baseUrl}/favicon.ico</Image>
  <Url type="text/html" method="get" template="${baseUrl}/search/{searchTerms}?ref=opensearch"/>
  <moz:SearchForm>${baseUrl}/search</moz:SearchForm>
</OpenSearchDescription>
`;
};

exports.opensearchResponse = opensearchResponse;