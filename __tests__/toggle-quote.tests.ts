import * as obsidian from 'obsidian';

// Following https://stackoverflow.com/a/52366601,
// get Jest to understand that our mock of
// MarkdownView is quite different in its type
// definition from the actual obsidian MarkdownView
// (in that ours just implements some of the real
// class' methods):
const MarkdownView = <jest.Mock>obsidian.MarkdownView;

import { toggleQuote } from '../src/toggle-quote';

const defaultViewSettings = {
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed venenatis lectus et leo viverra, ac viverra purus rutrum.',
    '',
    'Etiam semper massa ut est faucibus, eu luctus arcu porttitor.'
  ],
  selectionStart: {line: 0, ch: 0},
  selectionEnd: {line: 0, ch: 0},
}

const defaultPrefix = '> ';

describe('Examining toggle-blockquote-at-current-indentation', () => {
    // beforeAll(() => {
    // });

    test('Adds and removes blockquote from single line with cursor at beginning of line', async () => {
      const view = new MarkdownView(...Object.values(defaultViewSettings));
      
      expect(JSON.stringify(view)).toEqual(
        '{"editor":{"content":["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Sed venenatis lectus et leo viverra, ac viverra purus rutrum.","","Etiam semper massa ut est faucibus, eu luctus arcu porttitor."],"selection":[{"line":0,"ch":0},{"line":0,"ch":0}]}}'
      );

      await toggleQuote(view, defaultPrefix);
      expect(JSON.stringify(view)).toEqual(
        '{"editor":{"content":["> Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Sed venenatis lectus et leo viverra, ac viverra purus rutrum.","","Etiam semper massa ut est faucibus, eu luctus arcu porttitor."],"selection":[{"line":0,"ch":2},{"line":0,"ch":2}]}}'
      );

      await toggleQuote(view, defaultPrefix);
      expect(JSON.stringify(view)).toEqual(
        '{"editor":{"content":["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Sed venenatis lectus et leo viverra, ac viverra purus rutrum.","","Etiam semper massa ut est faucibus, eu luctus arcu porttitor."],"selection":[{"line":0,"ch":0},{"line":0,"ch":0}]}}'
      );
    })
});
