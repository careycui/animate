// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

// 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');
// 压缩js
fis.config.set('modules.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define'
    }
});

fis.config.set('roadmap.path',[
    //指定JQUERY部署文件夹
    {
        reg:
    },
    {
        reg:/^\/components\/node_modules\/jquery\/src\/*.*/,
        release : false
    },
    {
        reg: /^\/components\/*.*$/i,
        isMod: true,
        jswrapper: {
            type: 'cmd'
        }
    }
]);

// 取消下面的注释设置打包规则
fis.config.set('pack', {
    '/lib/lib.js': [
        'components/node_modules/angular/angular.min.js',
        'components/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
        'components/node_modules/jquery/dist/jquery.min.js',
        'components/node_modules/seajs/lib/sea.js'
    ],
    // 取消下面的注释设置CSS打包规则，CSS打包的同时会进行图片合并
    '/css/common.css': [
        'components/node_modules/bootstrap/dist/css/bootstrap.min.css',
        'components/node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css'
    ]
});

// 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);