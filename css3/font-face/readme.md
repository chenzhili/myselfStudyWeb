@font-face {
font-family: 'ChunkFiveRegular';
src: url('fonts/chunkfive.eot');
src: url('fonts/chunkfive.eot?#iefix') format('embedded-opentype'),
url('fonts/chunkfive.woff') format('woff'),
url('fonts/chunkfive.ttf') format('truetype'),
url('fonts/chunkfive.svg#ChunkFiveRegular') format('svg');}

format是为了帮助浏览器识别字体格式，浏览器不会根据后缀名去自动识别字体格式的
字符格式有很多种
truetype,opentype,truetype-aat,embedded-opentype,svg等；

#号之后相当于
引用名称
类似别名 因为不是所有格式都被浏览器识别
所以不识别的时候加上备用引用名称

<!-- 了解这个字体 定义的每个 属性的含义 在 @font-face中 -->