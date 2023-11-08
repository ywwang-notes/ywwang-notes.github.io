<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<base href="https://sqlite.org/wasm/doc/tip/demo-123.js" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data:;  script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline';  style-src 'self' 'unsafe-inline';  img-src * data:;  worker-src 'self' 'nonce-2318ba603f29778bc71d83ce0dc73ad4974399ec777e9682';" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>demo-123.js</title>
<link rel="alternate" type="application/rss+xml" title="RSS Feed" \
 href="/wasm/timeline.rss" />
<link rel="stylesheet" href="/wasm/style.css?id=d18a597d" type="text/css" />
</head>
<body class="artifact rpage-file cpage-file">
<script nonce="2318ba603f29778bc71d83ce0dc73ad4974399ec777e9682">
if(window.localStorage && +window.localStorage.getItem('dark-mode')){
  // do this early to try to lessen the effect of a FOUC when switching pages
  document.firstElementChild.classList.add('dark-mode');
}
</script>
<style>
  @import url(/wasm/doc/trunk/assets/fossil-doc.css)
</style>
<script src="/wasm/doc/trunk/assets/highlightjs/highlight-sqlite3.min.js"></script>
<script nonce="2318ba603f29778bc71d83ce0dc73ad4974399ec777e9682">
window.addEventListener('DOMContentLoaded', function(){
  "use strict";
  /* Set up bright/dark mode toggle */
  const eHtml = document.firstElementChild;
  const darkCssClass = 'dark-mode';
  const ln = document.createElement('a');
  ln.href = '#';
  const localStorage = self.localStorage || self.sessionStorage || {
    setItem:()=>{}, getItem:()=>{}
  };
  const updateThemeLink = function(doToggle=false){
    if(doToggle) eHtml.classList.toggle(darkCssClass);
    const isDark = eHtml.classList.contains(darkCssClass);
    if(isDark) ln.innerText = "Bright Mode";
    else ln.innerText = "Dark Mode";
    localStorage.setItem(darkCssClass, isDark ? 1 : 0);
  };
  updateThemeLink();
  const eNavLinks = document.querySelector('nav#nav-links');
  ln.addEventListener('click', (e)=>{
    updateThemeLink(true);
    e.stopPropagation();
    e.preventDefault();
    return false;
  }, true);
  eNavLinks.appendChild(ln);
  if(document.body.classList.contains('doc')){
    /* Init code specific to the /doc pages. */
    const klassDSN = 'disable-section-numbers';
    /** If the document has less than 2 H1 elements,
        disable section numbering. */
    if(!document.body.classList.contains(klassDSN)
      && document.body.querySelectorAll('h1').length<2){
      document.body.classList.add(klassDSN);
    }
    for(const klass of [ klassDSN ]) { 
      /** For each CSS class name in this list, search for a SPAN
          element with that class. If found, delete the element and
          add that class name to the BODY element. These are used for
          CSS filters.
      */
      const e = document.body.classList.contains(klass)
        ? false : document.body.querySelector('span.'+klass);
      if(e){
        e.remove();
        document.body.classList.add(klass);
      }
    }
  }/* body.doc-specific pieces */
}, true);
</script><header id='header-logo'>
<a href='https://sqlite.org' class='nav-logo'><img src='/wasm/logo' alt='SQLite logo'/></a>
<!-- maintenance reminder: ^^^^ use /logo instead of /doc/... or /raw/...
  to get cachable image, though cache time is relatively short. -->
<span>WebAssembly &amp; JavaScript</span>
</header><nav class='mainmenu' id='nav-links'><a href='/wasm/doc/trunk/index.md' class=''>Home</a><a href='/wasm/doc/trunk/news.md' class=''>News</a><a href='/wasm/doc/trunk/api-index.md' class=''>API Index</a><a href='/wasm/doc/trunk/cookbook.md' class=''>Cookbook</a><a href='/wasm/doc/trunk/faq.md' class=''>FAQ</a><a href='/wasm/search' class=''>Search</a></nav><h1>demo-123.js</h1>
<form id='f01' method='GET' action='/wasm/file'>
<input type='hidden' name='udc' value='1'>
<div class="submenu">
<a class="label sml-annotate" href="/wasm/annotate?filename=demo-123.js&amp;checkin=tip">Annotate</a>
<a class="label sml-artifact" href="/wasm/artifact/38aa8faec4">Artifact</a>
<a class="label sml-blame" href="/wasm/blame?filename=demo-123.js&amp;checkin=tip">Blame</a>
<a class="label sml-check-ins-using" href="/wasm/timeline?uf=38aa8faec4d0ace1c973bc8a7a1533584463ebeecd4c420daa7d9687beeb9cb5">Check-ins Using</a>
<a class="label sml-doc" href="/wasm/doc/tip/demo-123.js">Doc</a>
<a class="label sml-download" href="/wasm/raw/38aa8faec4d0ace1c973bc8a7a1533584463ebeecd4c420daa7d9687beeb9cb5?at=demo-123.js">Download</a>
<a class="label sml-hex" href="/wasm/hexdump?name=38aa8faec4d0ace1c973bc8a7a1533584463ebeecd4c420daa7d9687beeb9cb5">Hex</a>
<label class='submenuctrl submenuckbox smc-ln'><input type='checkbox' name='ln' id='submenuctrl-0' >Line Numbers</label>
</div>
<input type="hidden" name="name" value="demo-123.js">
<input type="hidden" name="txt" value="">
</form>
<div class="content"><span id="debugMsg"></span>
<h2>File <a data-href='/wasm/finfo?name=demo-123.js&m&ci=tip' href='/wasm/honeypot'>demo-123.js</a>
from the <a data-href='/wasm/info/tip' href='/wasm/honeypot'>latest check-in</a></h2>
<hr>
<blockquote class="file-content">
<pre>
<code class="language-js">/*
  2022-09-19

  The author disclaims copyright to this source code.  In place of a
  legal notice, here is a blessing:

  *   May you do good and not evil.
  *   May you find forgiveness for yourself and forgive others.
  *   May you share freely, never taking more than you give.

  ***********************************************************************

  A basic demonstration of the SQLite3 &quot;OO#1&quot; API.
*/
&#39;use strict&#39;;
(function(){
  /**
     Set up our output channel differently depending
     on whether we are running in a worker thread or
     the main (UI) thread.
  */
  let logHtml;
  if(self.window === self /* UI thread */){
    console.log(&quot;Running demo from main UI thread.&quot;);
    logHtml = function(cssClass,...args){
      const ln = document.createElement(&#39;div&#39;);
      if(cssClass) ln.classList.add(cssClass);
      ln.append(document.createTextNode(args.join(&#39; &#39;)));
      document.body.append(ln);
    };
  }else{ /* Worker thread */
    console.log(&quot;Running demo from Worker thread.&quot;);
    logHtml = function(cssClass,...args){
      postMessage({
        type:&#39;log&#39;,
        payload:{cssClass, args}
      });
    };
  }
  const log = (...args)=&gt;logHtml(&#39;&#39;,...args);
  const warn = (...args)=&gt;logHtml(&#39;warning&#39;,...args);
  const error = (...args)=&gt;logHtml(&#39;error&#39;,...args);

  const demo1 = function(sqlite3){
    const capi = sqlite3.capi/*C-style API*/,
          oo = sqlite3.oo1/*high-level OO API*/;
    log(&quot;sqlite3 version&quot;,capi.sqlite3_libversion(), capi.sqlite3_sourceid());
    const db = new oo.DB(&quot;/mydb.sqlite3&quot;,&#39;ct&#39;);
    log(&quot;transient db =&quot;,db.filename);
    /**
       Never(!) rely on garbage collection to clean up DBs and
       (especially) prepared statements. Always wrap their lifetimes
       in a try/finally construct, as demonstrated below. By and
       large, client code can entirely avoid lifetime-related
       complications of prepared statement objects by using the
       DB.exec() method for SQL execution.
    */
    try {
      log(&quot;Create a table...&quot;);
      db.exec(&quot;CREATE TABLE IF NOT EXISTS t(a,b)&quot;);
      //Equivalent:
      db.exec({
        sql:&quot;CREATE TABLE IF NOT EXISTS t(a,b)&quot;
        // ... numerous other options ... 
      });
      // SQL can be either a string or a byte array
      // or an array of strings which get concatenated
      // together as-is (so be sure to end each statement
      // with a semicolon).

      log(&quot;Insert some data using exec()...&quot;);
      let i;
      for( i = 20; i &lt;= 25; ++i ){
        db.exec({
          sql: &quot;insert into t(a,b) values (?,?)&quot;,
          // bind by parameter index...
          bind: [i, i*2]
        });
        db.exec({
          sql: &quot;insert into t(a,b) values ($a,$b)&quot;,
          // bind by parameter name...
          bind: {$a: i * 10, $b: i * 20}
        });
      }    

      log(&quot;Insert using a prepared statement...&quot;);
      let q = db.prepare([
        // SQL may be a string or array of strings
        // (concatenated w/o separators).
        &quot;insert into t(a,b) &quot;,
        &quot;values(?,?)&quot;
      ]);
      try {
        for( i = 100; i &lt; 103; ++i ){
          q.bind( [i, i*2] ).step();
          q.reset();
        }
        // Equivalent...
        for( i = 103; i &lt;= 105; ++i ){
          q.bind(1, i).bind(2, i*2).stepReset();
        }
      }finally{
        q.finalize();
      }

      log(&quot;Query data with exec() using rowMode &#39;array&#39;...&quot;);
      db.exec({
        sql: &quot;select a from t order by a limit 3&quot;,
        rowMode: &#39;array&#39;, // &#39;array&#39; (default), &#39;object&#39;, or &#39;stmt&#39;
        callback: function(row){
          log(&quot;row &quot;,++this.counter,&quot;=&quot;,row);
        }.bind({counter: 0})
      });

      log(&quot;Query data with exec() using rowMode &#39;object&#39;...&quot;);
      db.exec({
        sql: &quot;select a as aa, b as bb from t order by aa limit 3&quot;,
        rowMode: &#39;object&#39;,
        callback: function(row){
          log(&quot;row &quot;,++this.counter,&quot;=&quot;,JSON.stringify(row));
        }.bind({counter: 0})
      });

      log(&quot;Query data with exec() using rowMode &#39;stmt&#39;...&quot;);
      db.exec({
        sql: &quot;select a from t order by a limit 3&quot;,
        rowMode: &#39;stmt&#39;,
        callback: function(row){
          log(&quot;row &quot;,++this.counter,&quot;get(0) =&quot;,row.get(0));
        }.bind({counter: 0})
      });

      log(&quot;Query data with exec() using rowMode INTEGER (result column index)...&quot;);
      db.exec({
        sql: &quot;select a, b from t order by a limit 3&quot;,
        rowMode: 1, // === result column 1
        callback: function(row){
          log(&quot;row &quot;,++this.counter,&quot;b =&quot;,row);
        }.bind({counter: 0})
      });

      log(&quot;Query data with exec() using rowMode $COLNAME (result column name)...&quot;);
      db.exec({
        sql: &quot;select a a, b from t order by a limit 3&quot;,
        rowMode: &#39;$a&#39;,
        callback: function(value){
          log(&quot;row &quot;,++this.counter,&quot;a =&quot;,value);
        }.bind({counter: 0})
      });

      log(&quot;Query data with exec() without a callback...&quot;);
      let resultRows = [];
      db.exec({
        sql: &quot;select a, b from t order by a limit 3&quot;,
        rowMode: &#39;object&#39;,
        resultRows: resultRows
      });
      log(&quot;Result rows:&quot;,JSON.stringify(resultRows,undefined,2));

      log(&quot;Create a scalar UDF...&quot;);
      db.createFunction({
        name: &#39;twice&#39;,
        xFunc: function(pCx, arg){ // note the call arg count
          return arg + arg;
        }
      });
      log(&quot;Run scalar UDF and collect result column names...&quot;);
      let columnNames = [];
      db.exec({
        sql: &quot;select a, twice(a), twice(&#39;&#39;||a) from t order by a desc limit 3&quot;,
        columnNames: columnNames,
        rowMode: &#39;stmt&#39;,
        callback: function(row){
          log(&quot;a =&quot;,row.get(0), &quot;twice(a) =&quot;, row.get(1),
              &quot;twice(&#39;&#39;||a) =&quot;,row.get(2));
        }
      });
      log(&quot;Result column names:&quot;,columnNames);

      try{
        log(&quot;The following use of the twice() UDF will&quot;,
            &quot;fail because of incorrect arg count...&quot;);
        db.exec(&quot;select twice(1,2,3)&quot;);
      }catch(e){
        warn(&quot;Got expected exception:&quot;,e.message);
      }

      try {
        db.transaction( function(D) {
          D.exec(&quot;delete from t&quot;);
          log(&quot;In transaction: count(*) from t =&quot;,db.selectValue(&quot;select count(*) from t&quot;));
          throw new sqlite3.SQLite3Error(&quot;Demonstrating transaction() rollback&quot;);
        });
      }catch(e){
        if(e instanceof sqlite3.SQLite3Error){
          log(&quot;Got expected exception from db.transaction():&quot;,e.message);
          log(&quot;count(*) from t =&quot;,db.selectValue(&quot;select count(*) from t&quot;));
        }else{
          throw e;
        }
      }

      try {
        db.savepoint( function(D) {
          D.exec(&quot;delete from t&quot;);
          log(&quot;In savepoint: count(*) from t =&quot;,db.selectValue(&quot;select count(*) from t&quot;));
          D.savepoint(function(DD){
            const rows = [];
            DD.exec({
              sql: [&quot;insert into t(a,b) values(99,100);&quot;,
                    &quot;select count(*) from t&quot;],
              rowMode: 0,
              resultRows: rows
            });
            log(&quot;In nested savepoint. Row count =&quot;,rows[0]);
            throw new sqlite3.SQLite3Error(&quot;Demonstrating nested savepoint() rollback&quot;);
          })
        });
      }catch(e){
        if(e instanceof sqlite3.SQLite3Error){
          log(&quot;Got expected exception from nested db.savepoint():&quot;,e.message);
          log(&quot;count(*) from t =&quot;,db.selectValue(&quot;select count(*) from t&quot;));
        }else{
          throw e;
        }
      }
    }finally{
      db.close();
    }

    log(&quot;That&#39;s all, folks!&quot;);

    /**
       Some of the features of the OO API not demonstrated above...

       - get change count (total or statement-local, 32- or 64-bit)
       - get a DB&#39;s file name

       Misc. Stmt features:

       - Various forms of bind()
       - clearBindings()
       - reset()
       - Various forms of step()
       - Variants of get() for explicit type treatment/conversion,
         e.g. getInt(), getFloat(), getBlob(), getJSON()
       - getColumnName(ndx), getColumnNames()
       - getParamIndex(name)
    */
  }/*demo1()*/;

  log(&quot;Loading and initializing sqlite3 module...&quot;);
  if(self.window!==self) /*worker thread*/{
    /*
      If sqlite3.js is in a directory other than this script, in order
      to get sqlite3.js to resolve sqlite3.wasm properly, we have to
      explicitly tell it where sqlite3.js is being loaded from. We do
      that by passing the `sqlite3.dir=theDirName` URL argument to
      _this_ script. That URL argument will be seen by the JS/WASM
      loader and it will adjust the sqlite3.wasm path accordingly. If
      sqlite3.js/.wasm are in the same directory as this script then
      that&#39;s not needed.

      URL arguments passed as part of the filename via importScripts()
      are simply lost, and such scripts see the self.location of
      _this_ script.
    */
    let sqlite3Js = &#39;sqlite3.js&#39;;
    const urlParams = new URL(self.location.href).searchParams;
    if(urlParams.has(&#39;sqlite3.dir&#39;)){
      sqlite3Js = urlParams.get(&#39;sqlite3.dir&#39;) + &#39;/&#39; + sqlite3Js;
    }
    importScripts(sqlite3Js);
  }
  self.sqlite3InitModule({
    // We can redirect any stdout/stderr from the module
    // like so...
    print: log,
    printErr: error
  }).then(function(sqlite3){
    //console.log(&#39;sqlite3 =&#39;,sqlite3);
    log(&quot;Done initializing. Running demo...&quot;);
    try {
      demo1(sqlite3);
    }catch(e){
      error(&quot;Exception:&quot;,e.message);
    }
  });
})();
</code>
</pre>
</blockquote>
</div>
<script nonce="2318ba603f29778bc71d83ce0dc73ad4974399ec777e9682">
window.addEventListener('DOMContentLoaded',async function(){
  document.querySelectorAll('a[href^="http"],a[href^="//"]').forEach(function(e){
    // Clearly mark external links
    e.classList.add('external');
    // Arguable: open external links in their own tab
    e.target = e.href;
  });
}, false);
</script>
<script id='href-data' type='text/json'>{"delay":0,"mouseover":0}</script>
<script nonce="2318ba603f29778bc71d83ce0dc73ad4974399ec777e9682">/* style.c:914 */
function debugMsg(msg){
var n = document.getElementById("debugMsg");
if(n){n.textContent=msg;}
}
/* href.js */
var antiRobot = 0;
function antiRobotGo(){
if( antiRobot!=3 ) return;
antiRobot = 7;
var anchors = document.getElementsByTagName("a");
for(var i=0; i<anchors.length; i++){
var j = anchors[i];
if(j.hasAttribute("data-href")) j.href=j.getAttribute("data-href");
}
var forms = document.getElementsByTagName("form");
for(var i=0; i<forms.length; i++){
var j = forms[i];
if(j.hasAttribute("data-action")) j.action=j.getAttribute("data-action");
}
}
function antiRobotDefense(){
var x = document.getElementById("href-data");
var jx = x.textContent || x.innerText;
var g = JSON.parse(jx);
if( g.mouseover ){
document.body.onmousedown=function(){
antiRobot |= 2;
antiRobotGo();
document.body.onmousedown=null;
}
document.body.onmousemove=function(){
antiRobot |= 2;
antiRobotGo();
document.body.onmousemove=null;
}
}else{
antiRobot |= 2;
}
if( g.delay>0 ){
setTimeout(function(){
antiRobot |= 1;
antiRobotGo();
}, g.delay)
}else{
antiRobot |= 1;
}
antiRobotGo();
}
antiRobotDefense();
</script>
<script src='/wasm/builtin?name=menu.js&id=882b9c22'></script>
</body>
</html>
