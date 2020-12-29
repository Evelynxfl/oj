<template>
  <div class="code-mirror-box">
    <textarea ref="textareaCoder"></textarea>
  </div>
</template>

<script>
// 引入全局实例
import _CodeMirror from 'codemirror'
// language
import 'codemirror/mode/javascript/javascript.js'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/monokai.css'
// active-line
import 'codemirror/addon/selection/active-line.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror

  export default {
    name: 'code-mirror-box',
    data () {
      return {
        // 内部真实的内容
        code: '',
        // 编辑器实例
        coder: null,
        // 默认配置
        options: {
          mode: 'java', // 默认的语法类型
          // 缩进格式
          tabSize: 2,
          // 主题，对应主题库 JS 需要提前引入
        //   theme: 'monokai',
          // 显示行号
          lineNumbers: true,
          line: true,
          styleActiveLine: true, // 激活行样式
          // 添加折叠
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        }
      }
    },
    mounted () {
        console.log('mounted被执行了')
      // 初始化
      this._initialize()
    },
    methods: {
      // 初始化
      _initialize () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = CodeMirror.fromTextArea(this.$refs.textareaCoder, this.options)
        // 监听改变
        this.coder.on('change', (coder) => {
            this.code = coder.getValue()
            
        })     
      },
    }
  }
</script>

<style lang="less" scoped>
  .code-mirror-box {
    font-size: 14px;
  }
</style>