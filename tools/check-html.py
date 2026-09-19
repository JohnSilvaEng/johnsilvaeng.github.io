#!/usr/bin/env python3
"""Structural checks on index.html.

The nesting check alone has already missed one real defect: a replacement that
dropped a <li> wrapper left bare text sitting directly inside a <ul>. Tag
balance was still perfect, so the check passed and the broken list shipped.
Content-model checking is here so that class of mistake cannot pass again.
"""
import sys
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param',
        'source','track','wbr','path','use','circle','rect','line','polygon',
        'polyline','stop','ellipse'}

# Elements whose only permitted element children are listed, and which must not
# contain non-whitespace text directly.
CONTENT_MODEL = {
    'ul':     {'li', 'script', 'template'},
    'ol':     {'li', 'script', 'template'},
    'dl':     {'dt', 'dd', 'div', 'script', 'template'},
    'table':  {'caption','colgroup','thead','tbody','tfoot','tr','script','template'},
    'thead':  {'tr', 'script', 'template'},
    'tbody':  {'tr', 'script', 'template'},
    'tfoot':  {'tr', 'script', 'template'},
    'tr':     {'td', 'th', 'script', 'template'},
    'select': {'option', 'optgroup', 'script', 'template'},
}

class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
        self.ids = {}

    def _parent(self):
        return self.stack[-1] if self.stack else None

    def handle_starttag(self, tag, attrs):
        line = self.getpos()[0]
        p = self._parent()
        if p and p[0] in CONTENT_MODEL and tag not in CONTENT_MODEL[p[0]]:
            self.errors.append(
                f'line {line}: <{tag}> is not allowed directly inside <{p[0]}> '
                f'(opened line {p[1]})')
        for k, v in attrs:
            if k == 'id' and v:
                if v in self.ids:
                    self.errors.append(f'line {line}: duplicate id "{v}" '
                                       f'(first seen line {self.ids[v]})')
                else:
                    self.ids[v] = line
        if tag not in VOID:
            self.stack.append((tag, line))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        line = self.getpos()[0]
        if not self.stack:
            self.errors.append(f'line {line}: stray </{tag}>')
            return
        if self.stack[-1][0] != tag:
            self.errors.append(
                f'line {line}: </{tag}> but the innermost open element is '
                f'<{self.stack[-1][0]}> from line {self.stack[-1][1]}')
            return
        self.stack.pop()

    def handle_data(self, data):
        if not data.strip():
            return
        p = self._parent()
        if p and p[0] in CONTENT_MODEL:
            snippet = ' '.join(data.split())[:60]
            self.errors.append(
                f'line {self.getpos()[0]}: bare text directly inside <{p[0]}> '
                f'(opened line {p[1]}): "{snippet}"')

def main(path='index.html'):
    c = Check()
    c.feed(open(path, encoding='utf-8').read())
    for tag, line in c.stack:
        c.errors.append(f'unclosed <{tag}> opened at line {line}')

    # aria-controls must point at exactly one existing id
    import re
    src = open(path, encoding='utf-8').read()
    for m in re.finditer(r'aria-controls="([^"]+)"', src):
        target = m.group(1)
        if src.count(f'id="{target}"') != 1:
            line = src[:m.start()].count('\n') + 1
            c.errors.append(f'line {line}: aria-controls="{target}" matches '
                            f'{src.count(chr(34).join(["id=", target, ""]))} ids, expected 1')

    if c.errors:
        print(f'{path}: {len(c.errors)} problem(s)')
        for e in c.errors:
            print('  ' + e)
        return 1
    print(f'{path}: nesting, content model, ids and aria-controls all OK')
    return 0

if __name__ == '__main__':
    sys.exit(main(*sys.argv[1:]))
