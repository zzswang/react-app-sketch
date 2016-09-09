import 'github-markdown-css';
import React from 'react';
import readme from '../../../README.md';
import './style.scss';


export default function ReadMe() {
  return (
    <article className="markdown-body">
      <div dangerouslySetInnerHTML={{__html: readme}} />
    </article>
  );
}
