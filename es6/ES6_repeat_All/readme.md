2018/1/15
1、配置环境
	用 bebel 对于 es6进行 转换
	一、安装
		npm install -g babel-cli
		npm install --save-dev babel-preset-es2015 babel-cli
	二、插件 .babelrc的文件
		简单配置
		{
			"presets":["es2015"],
			"plugins":[]
		}