# jquery-rocketsorter

Yet another simple lightweight jQuery plugin for table sorting.

## Instalation

Include script after the jQuery library (unless you are packaging scripts somehow else):

```HTML
<script src="/path/to/jquery.rocketsorter.js"></script>
```

## Usage

```HTML

<table summary="Table summary" class="table">
  <thead>
    <tr>
      <th>Header</th>
      <th>Header</th>
      <th>Header</th>
        <th>Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Content</td>
      <td>1</td>
      <td>a</td>
      <td>R</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>3</td>
      <td>b</td>
      <td>U</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>2</td>
      <td>f</td>
      <td>I</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>5</td>
      <td>d</td>
      <td>V</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>4</td>
      <td>e</td>
      <td>O</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>2</td>
      <td>c</td>
      <td>M 1</td>
    </tr>

    <tr>
      <td>Content</td>
      <td>2</td>
      <td>c</td>
      <td>M 2</td>
    </tr>
  </tbody>
</table>
```

A HTML markup like above and some startup scripts as follows:

```JS
jQuery('.table').rocketSorter({
  parameters: [{
    coll: 1,
    method: 'numeric',
    reverse: false
  },
  {
    coll: 2,
    method: 'alphabetic',
    reverse: false
  },
  {
    coll: 3,
    method: 'alphabetic',
    reverse: false
  }] 
});

```

[Open in CODEPEN](http://codepen.io/davireinke/pen/DEkiw)

## Sorters

The default column for sorting is the first one (zero index) and there are four 
core sorters: `alphabetic`, `numeric`, `currency` and `percent`.

## Authors

[Davi Reinke](http://github.com/dreinke)

## License

jquery-rocketsorter Composer is licensed under the MIT License - see the LICENSE file for details